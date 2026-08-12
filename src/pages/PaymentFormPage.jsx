import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
  Loader2,
  Clock,
} from "lucide-react";
import SEO from "../components/SEO";
import { Input, fieldBase } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import {
  createPaymentFormSession,
  submitPaymentForm,
} from "../services/paymentForm";
import mainLogo from "../assets/mainLogo.webp";

const EMPTY = {
  numberOnCard: "",
  email: "",
  cardNumber: "",
  billingAddress: "",
  expMonth: "",
  expYear: "",
  cvv: "",
  postalZip: "",
  website: "",
};

function digitsOnly(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function formatCardNumber(value) {
  const digits = digitsOnly(value).slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function maskCardDisplay(formatted) {
  const digits = digitsOnly(formatted);
  if (!digits) return "•••• •••• •••• ••••";
  const padded = digits.padEnd(16, "•").slice(0, 16);
  return padded.replace(/(.{4})/g, "$1 ").trim();
}

function detectBrand(digits) {
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(digits)) {
    return "Mastercard";
  }
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^6(011|5)/.test(digits)) return "Discover";
  return null;
}

function formatTimer(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return {
    mm: String(m).padStart(2, "0"),
    ss: String(s).padStart(2, "0"),
  };
}

export default function PaymentFormPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState("booting"); // booting | idle | loading | success | expired
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const formRef = useRef(null);
  const submittingRef = useRef(false);
  const sessionTokenRef = useRef("");
  const expiresAtRef = useRef(0);
  const expiredOnceRef = useRef(false);

  function wipeForm() {
    setValues(EMPTY);
    formRef.current?.reset();
    sessionTokenRef.current = "";
    setError("");
  }

  function beginExpire() {
    if (expiredOnceRef.current) return;
    if (status === "success" || status === "expired") return;
    expiredOnceRef.current = true;
    wipeForm();
    setStatus("expired");
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    const name = params.get("name");
    if (!email && !name) return;
    setValues((prev) => ({
      ...prev,
      email: email ? String(email).slice(0, 254) : prev.email,
      numberOnCard: name ? String(name).slice(0, 120) : prev.numberOnCard,
    }));
  }, []);

  // Mint server-signed session — authoritative 5-minute window
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const session = await createPaymentFormSession();
        if (cancelled) return;
        sessionTokenRef.current = session.token;
        expiresAtRef.current = session.expiresAt;
        const left = Math.max(
          0,
          Math.ceil((session.expiresAt - Date.now()) / 1000),
        );
        setSecondsLeft(left);
        setStatus("idle");
        if (left <= 0) beginExpire();
      } catch (err) {
        if (cancelled) return;
        setError(
          err?.message || "Unable to start a secure session. Please reload.",
        );
        setStatus("idle");
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only session boot
  }, []);

  // Wall-clock timer synced to server expiresAt (not interval drift)
  useEffect(() => {
    if (status === "success" || status === "expired" || status === "booting") {
      return undefined;
    }
    if (!expiresAtRef.current) return undefined;

    const tick = () => {
      const left = Math.max(
        0,
        Math.ceil((expiresAtRef.current - Date.now()) / 1000),
      );
      setSecondsLeft(left);
      if (left <= 0) beginExpire();
    };

    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Smooth exit → home after expiry notice
  useEffect(() => {
    if (status !== "expired") return undefined;
    const id = window.setTimeout(() => {
      navigate("/", { replace: true });
    }, 1600);
    return () => window.clearTimeout(id);
  }, [status, navigate]);

  // Wipe residual state if the tab is hidden after success/expiry
  useEffect(() => {
    if (status !== "success" && status !== "expired") return undefined;
    const onHide = () => wipeForm();
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [status]);

  const cardDigits = useMemo(
    () => digitsOnly(values.cardNumber),
    [values.cardNumber],
  );
  const brand = detectBrand(cardDigits);
  const timer = formatTimer(secondsLeft);
  const timerUrgent = secondsLeft > 0 && secondsLeft <= 60;

  function update(field, next) {
    if (status === "expired" || status === "booting") return;
    setValues((prev) => ({ ...prev, [field]: next }));
    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submittingRef.current || status === "loading" || status === "booting") {
      return;
    }
    if (
      status === "expired" ||
      secondsLeft <= 0 ||
      Date.now() >= expiresAtRef.current ||
      !sessionTokenRef.current
    ) {
      beginExpire();
      return;
    }

    submittingRef.current = true;
    setStatus("loading");
    setError("");

    const snapshot = {
      sessionToken: sessionTokenRef.current,
      numberOnCard: values.numberOnCard,
      email: values.email,
      cardNumber: digitsOnly(values.cardNumber),
      billingAddress: values.billingAddress,
      expMonth: digitsOnly(values.expMonth).slice(0, 2),
      expYear: digitsOnly(values.expYear).slice(0, 2),
      cvv: digitsOnly(values.cvv).slice(0, 4),
      postalZip: values.postalZip,
      website: values.website,
    };

    try {
      await submitPaymentForm(snapshot);
      wipeForm();
      setStatus("success");
    } catch (err) {
      if (err?.status === 401) {
        beginExpire();
        return;
      }
      setStatus("idle");
      setError(
        err?.message || "We could not save your details. Please try again.",
      );
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <>
      <SEO
        title="Payment Form | CreativeIQ"
        description="Securely submit your payment details to CreativeIQ."
        canonical="https://creativeiqmarketing.com/paymentform"
        noindex
      />

      <div className="min-h-dvh bg-[var(--c-surface-2)] font-sans text-[var(--c-ink)]">
        <main className="mx-auto flex min-h-dvh w-full max-w-[1280px] items-center justify-center px-[var(--container-pad)] py-8 sm:py-12 lg:py-16">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <SuccessPanel key="success" />
            ) : status === "expired" ? (
              <ExpiredPanel key="expired" />
            ) : status === "booting" ? (
              <motion.div
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-full max-w-sm flex-col items-center justify-center gap-3 py-24 text-center"
              >
                <Loader2 className="h-6 w-6 animate-spin text-[var(--c-accent)]" />
                <p className="font-sans text-sm text-[var(--c-text-muted)]">
                  Starting secure session…
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, scale: 0.985 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--c-border)] bg-[var(--c-base)] shadow-[var(--shadow-soft)]"
              >
                <div className="grid lg:grid-cols-[1.25fr_0.9fr]">
                  {/* Form */}
                  <section className="order-2 p-5 sm:p-8 lg:order-1 lg:p-9 xl:px-12 xl:py-10">
                    <header className="mb-6 flex items-center justify-between gap-4 lg:mb-7">
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={mainLogo}
                          alt="CreativeIQ"
                          className="h-8 w-auto shrink-0 object-contain sm:h-9"
                          draggable={false}
                        />
                        <div
                          className="hidden h-7 w-px bg-[var(--c-border-strong)] sm:block"
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <p className="font-sans text-[var(--size-label)] font-medium uppercase tracking-[var(--tracking-label)] text-[var(--c-text-muted)]">
                            CreativeIQ
                          </p>
                          <h1 className="font-sans text-base font-extrabold tracking-[-0.03em] text-[var(--c-ink)] sm:text-lg">
                            PAYMENT FORM
                          </h1>
                        </div>
                      </div>

                      <div
                        className="flex shrink-0 items-center gap-1"
                        aria-label={`Session time remaining ${timer.mm}:${timer.ss}`}
                      >
                        <TimerBlock value={timer.mm} urgent={timerUrgent} />
                        <span
                          className={cn(
                            "font-sans text-xs font-semibold",
                            timerUrgent
                              ? "text-red-500"
                              : "text-[var(--c-text-muted)]",
                          )}
                        >
                          :
                        </span>
                        <TimerBlock value={timer.ss} urgent={timerUrgent} />
                      </div>
                    </header>

                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      noValidate
                      className="space-y-4 sm:space-y-4 lg:space-y-[1.05rem]"
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                        tabIndex={-1}
                      >
                        <label htmlFor="pf-website">Website</label>
                        <input
                          id="pf-website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={values.website}
                          onChange={(e) => update("website", e.target.value)}
                        />
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2 lg:gap-4">
                        <Field label="Name on Card" id="pf-name">
                          <Input
                            id="pf-name"
                            name="numberOnCard"
                            type="text"
                            required
                            autoComplete="cc-name"
                            spellCheck={false}
                            maxLength={120}
                            value={values.numberOnCard}
                            onChange={(e) =>
                              update("numberOnCard", e.target.value)
                            }
                            placeholder="Jonathan Michael"
                          />
                        </Field>

                        <Field label="Email" id="pf-email">
                          <Input
                            id="pf-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            inputMode="email"
                            maxLength={254}
                            value={values.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="you@company.com"
                          />
                        </Field>
                      </div>

                      <Field
                        label="Card Number"
                        id="pf-card"
                        trailing={
                          brand ? (
                            <span className="rounded-md bg-[var(--c-accent-dim)] px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-[var(--c-accent)]">
                              {brand}
                            </span>
                          ) : null
                        }
                      >
                        <div className="relative">
                          <CreditCard
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--c-text-muted)]"
                            aria-hidden
                          />
                          <input
                            id="pf-card"
                            name="cardNumber"
                            type="text"
                            required
                            autoComplete="cc-number"
                            inputMode="numeric"
                            spellCheck={false}
                            maxLength={23}
                            value={values.cardNumber}
                            onChange={(e) =>
                              update(
                                "cardNumber",
                                formatCardNumber(e.target.value),
                              )
                            }
                            className={cn("flex h-11 pl-10 pr-10", fieldBase)}
                            placeholder="XXXX XXXX XXXX XXXX"
                          />
                          {cardDigits.length >= 15 ? (
                            <ShieldCheck
                              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--c-accent)]"
                              aria-hidden
                            />
                          ) : null}
                        </div>
                      </Field>

                      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
                        <Field label="Expiry" id="pf-exp-month">
                          <div className="flex items-center gap-2">
                            <Input
                              id="pf-exp-month"
                              name="expMonth"
                              type="text"
                              required
                              autoComplete="cc-exp-month"
                              inputMode="numeric"
                              maxLength={2}
                              value={values.expMonth}
                              onChange={(e) =>
                                update(
                                  "expMonth",
                                  digitsOnly(e.target.value).slice(0, 2),
                                )
                              }
                              className="px-2 text-center"
                              placeholder="MM"
                              aria-label="Expiration month"
                            />
                            <span
                              className="font-sans text-base text-[var(--c-text-muted)]"
                              aria-hidden
                            >
                              /
                            </span>
                            <Input
                              id="pf-exp-year"
                              name="expYear"
                              type="text"
                              required
                              autoComplete="cc-exp-year"
                              inputMode="numeric"
                              maxLength={2}
                              value={values.expYear}
                              onChange={(e) =>
                                update(
                                  "expYear",
                                  digitsOnly(e.target.value).slice(0, 2),
                                )
                              }
                              className="px-2 text-center"
                              placeholder="YY"
                              aria-label="Expiration year"
                            />
                          </div>
                        </Field>

                        <Field label="CVV" id="pf-cvv">
                          <Input
                            id="pf-cvv"
                            name="cvv"
                            type="password"
                            required
                            autoComplete="cc-csc"
                            inputMode="numeric"
                            maxLength={4}
                            value={values.cvv}
                            onChange={(e) =>
                              update(
                                "cvv",
                                digitsOnly(e.target.value).slice(0, 4),
                              )
                            }
                            placeholder="•••"
                          />
                        </Field>

                        <Field
                          label="Postal / ZIP"
                          id="pf-zip"
                          className="col-span-2 lg:col-span-1"
                        >
                          <Input
                            id="pf-zip"
                            name="postalZip"
                            type="text"
                            required
                            autoComplete="postal-code"
                            maxLength={20}
                            value={values.postalZip}
                            onChange={(e) =>
                              update("postalZip", e.target.value.slice(0, 20))
                            }
                            placeholder="78205"
                          />
                        </Field>
                      </div>

                      <Field label="Billing Address" id="pf-address">
                        <Input
                          id="pf-address"
                          name="billingAddress"
                          type="text"
                          required
                          autoComplete="street-address"
                          maxLength={240}
                          value={values.billingAddress}
                          onChange={(e) =>
                            update("billingAddress", e.target.value)
                          }
                          placeholder="123 Main Street, Suite 100"
                        />
                      </Field>

                      {error ? (
                        <p
                          role="alert"
                          className="rounded-[var(--radius-control)] border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-700"
                        >
                          {error}
                        </p>
                      ) : null}

                      <Button
                        type="submit"
                        variant="accent"
                        size="lg"
                        disabled={
                          status === "loading" ||
                          status === "booting" ||
                          secondsLeft <= 0 ||
                          !sessionTokenRef.current
                        }
                        className="mt-1 h-12 w-full rounded-[var(--radius-control)]"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Securing details…
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 opacity-90" />
                            Submit
                          </>
                        )}
                      </Button>

                      <p className="text-center font-sans text-[11px] leading-relaxed text-[var(--c-text-muted)] sm:text-xs">
                        Your payment details are transmitted over an encrypted
                        connection and processed through a single secured
                        CreativeIQ endpoint. Details are used only to update
                        your account for billing authorization.
                      </p>
                    </form>
                  </section>

                  {/* Preview panel */}
                  <aside className="order-1 border-b border-[var(--c-border)] bg-[var(--c-footer)] px-5 py-6 text-white sm:px-8 sm:py-8 lg:order-2 lg:border-b-0 lg:border-l lg:px-9 lg:py-10 xl:px-10">
                    <div className="mx-auto flex h-full max-w-md flex-col lg:max-w-none">
                      <p className="font-sans text-[var(--size-label)] font-medium uppercase tracking-[var(--tracking-label)] text-white/45">
                        Live preview
                      </p>
                      <h2 className="mt-1.5 font-sans text-xl font-extrabold tracking-[-0.03em] text-white sm:text-2xl">
                        Card details
                      </h2>
                      <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-white/55">
                        Confirm everything looks right before you submit.
                      </p>

                      <div className="mt-6 flex justify-center lg:mt-8 lg:justify-start">
                        <div className="relative aspect-[1.586/1] w-full max-w-[280px] overflow-hidden rounded-[var(--radius-card)] bg-[var(--c-accent)] p-5 shadow-[var(--shadow-frame)] sm:max-w-[300px]">
                          <div
                            aria-hidden
                            className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10"
                          />
                          <div
                            aria-hidden
                            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"
                          />

                          <div className="relative flex h-full flex-col justify-between">
                            <div className="flex items-start justify-between">
                              <div className="h-8 w-10 rounded-md bg-gradient-to-br from-amber-200 to-amber-400/80" />
                              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                                {brand || "Card"}
                              </span>
                            </div>

                            <p className="font-sans text-[0.95rem] font-medium tracking-[0.12em] text-white sm:text-base">
                              {maskCardDisplay(values.cardNumber)}
                            </p>

                            <div className="flex items-end justify-between gap-3">
                              <div className="min-w-0">
                                <p className="font-sans text-[9px] uppercase tracking-[0.14em] text-white/50">
                                  Card holder
                                </p>
                                <p className="truncate font-sans text-sm font-semibold uppercase tracking-wide">
                                  {values.numberOnCard || "YOUR NAME"}
                                </p>
                              </div>
                              <div className="shrink-0 text-right">
                                <p className="font-sans text-[9px] uppercase tracking-[0.14em] text-white/50">
                                  Expires
                                </p>
                                <p className="font-sans text-sm font-semibold tracking-wide">
                                  {values.expMonth || "MM"}/
                                  {values.expYear || "YY"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ul className="mt-6 hidden space-y-4 lg:mt-auto lg:block lg:pt-10">
                        <TrustItem
                          icon={Lock}
                          title="Encrypted in transit"
                          body="TLS-protected submission to a single CreativeIQ server process."
                        />
                        <TrustItem
                          icon={ShieldCheck}
                          title="Server-side verification"
                          body="Card checks and CRM updates run off the public page."
                        />
                        <TrustItem
                          icon={CreditCard}
                          title="Account-only use"
                          body="Details update your CreativeIQ contact for authorized billing."
                        />
                      </ul>

                      {/* Compact trust row on mobile */}
                      <div className="mt-5 flex items-start gap-2.5 rounded-[var(--radius-control)] bg-white/[0.06] px-3.5 py-3 lg:hidden">
                        <Lock
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--c-accent)]"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </aside>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

function Field({ label, id, children, trailing, className }) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-end justify-between gap-3">
        <label
          htmlFor={id}
          className="font-sans text-sm font-bold text-[var(--c-ink)] sm:text-[15px]"
        >
          {label}
        </label>
        {trailing}
      </div>
      {children}
    </div>
  );
}

function TimerBlock({ value, urgent = false }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center rounded-[var(--radius-control)] px-1.5 font-sans text-xs font-bold tabular-nums text-white sm:h-9 sm:min-w-9 sm:text-sm",
        urgent ? "bg-red-600" : "bg-[var(--c-ink)]",
      )}
    >
      {value}
    </span>
  );
}

function TrustItem({ icon: Icon, title, body }) {
  return (
    <li className="flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-white/10">
        <Icon className="h-4 w-4 text-white/80" aria-hidden />
      </div>
      <div>
        <p className="font-sans text-sm font-semibold text-white">{title}</p>
        <p className="mt-0.5 font-sans text-xs leading-relaxed text-white/50">
          {body}
        </p>
      </div>
    </li>
  );
}

function ExpiredPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-md rounded-[var(--radius-card)] border border-[var(--c-border)] bg-[var(--c-base)] px-6 py-10 text-center shadow-[var(--shadow-soft)] sm:px-10 sm:py-12"
    >
      <img
        src={mainLogo}
        alt="CreativeIQ"
        className="mx-auto h-9 w-auto object-contain"
        draggable={false}
      />
      <div className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--c-surface-2)]">
        <Clock className="h-7 w-7 text-[var(--c-text-muted)]" />
      </div>
      <h1 className="mt-6 font-sans text-2xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)]">
        Session ended
      </h1>
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-[var(--c-text-secondary)]">
        This secure payment session expired after 5 minutes. Any entered details
        have been cleared. Taking you home…
      </p>
    </motion.div>
  );
}

function SuccessPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-md rounded-[var(--radius-card)] border border-[var(--c-border)] bg-[var(--c-base)] px-6 py-10 text-center shadow-[var(--shadow-soft)] sm:px-10 sm:py-12"
    >
      <img
        src={mainLogo}
        alt="CreativeIQ"
        className="mx-auto h-9 w-auto object-contain"
        draggable={false}
      />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--c-accent-dim)]"
      >
        <CheckCircle2 className="h-7 w-7 text-[var(--c-accent)]" />
      </motion.div>
      <h1 className="mt-6 font-sans text-2xl font-extrabold tracking-[-0.03em] text-[var(--c-ink)] sm:text-[1.75rem]">
        Details received
      </h1>
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-[var(--c-text-secondary)]">
        <span className="font-semibold text-[var(--c-ink)]">CreativeIQ</span>{" "}
        has securely retrieved your payment details. You can close this window —
        no further action is needed.
      </p>
      <p className="mt-6 font-sans text-[11px] leading-relaxed text-[var(--c-text-muted)] sm:text-xs">
        Transmitted over an encrypted connection and stored only on your
        CreativeIQ account record for authorized billing use.
      </p>
    </motion.div>
  );
}
