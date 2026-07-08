import { createContext, useCallback, useContext, useState } from "react";

const RsvpContext = createContext(null);

export function RsvpProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openRsvp = useCallback(() => setOpen(true), []);
  const closeRsvp = useCallback(() => setOpen(false), []);

  return (
    <RsvpContext.Provider value={{ open, openRsvp, closeRsvp }}>
      {children}
    </RsvpContext.Provider>
  );
}

export function useRsvp() {
  const ctx = useContext(RsvpContext);
  if (!ctx) {
    throw new Error("useRsvp must be used within RsvpProvider");
  }
  return ctx;
}
