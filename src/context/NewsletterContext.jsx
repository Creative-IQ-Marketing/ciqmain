import { createContext, useCallback, useContext, useState } from "react";

const NewsletterContext = createContext(null);

export function NewsletterProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("newsletter_popup");

  // onClick={openNewsletter} passes an event, so only keep string sources.
  const openNewsletter = useCallback((from) => {
    setSource(typeof from === "string" ? from : "newsletter_popup");
    setOpen(true);
  }, []);
  const closeNewsletter = useCallback(() => setOpen(false), []);

  return (
    <NewsletterContext.Provider
      value={{ open, source, openNewsletter, closeNewsletter }}
    >
      {children}
    </NewsletterContext.Provider>
  );
}

export function useNewsletter() {
  const ctx = useContext(NewsletterContext);
  if (!ctx) {
    throw new Error("useNewsletter must be used within NewsletterProvider");
  }
  return ctx;
}
