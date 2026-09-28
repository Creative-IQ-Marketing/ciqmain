import ContactSection from "../contact/ContactSection";
import { Eyebrow } from "../signal/primitives";

/** The one light surface on the home page: the conversation starts here. */
export default function HomeContact() {
  return (
    <div className="s-dark pt-10">
      <div className="s-contact-wrap overflow-hidden rounded-t-[clamp(1.5rem,4vw,3rem)] bg-[var(--s-paper)] text-[var(--s-ink)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)] pt-14">
          <Eyebrow index="05" className="!text-[rgba(6,7,10,0.45)]">Start the conversation</Eyebrow>
        </div>
        <ContactSection variant="home" sectionId="contact" />
      </div>
    </div>
  );
}
