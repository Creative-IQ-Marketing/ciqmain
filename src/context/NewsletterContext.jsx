import { createContext, useCallback, useContext, useState } from "react";

const NewsletterContext = createContext(null);

export function NewsletterProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openNewsletter = useCallback(() => setOpen(true), []);
  const closeNewsletter = useCallback(() => setOpen(false), []);

  return (
    <NewsletterContext.Provider
      value={{ open, openNewsletter, closeNewsletter }}
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
