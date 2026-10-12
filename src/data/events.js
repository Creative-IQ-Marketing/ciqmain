import letsConnectNov from "../assets/events/lets-connect-nov.jpg";
import letsConnectAug from "../assets/events/lets-connect.jpg";
import carShow from "../assets/events/show-and-shine.jpg";
import businessUnplugged from "../assets/events/business-unplugged.jpg";

/**
 * CIQ events — single source of truth for the homepage Events section.
 * Add a new event here; it moves from "Upcoming" to "Recent" on its own once
 * the date has passed (San Antonio time).
 */
export const EVENTS = [
  {
    id: "lets-connect-2026-11",
    name: "Let's Connect",
    kind: "Networking · Live music",
    host: "Key Partner Network",
    date: "2026-11-18",
    start: "18:30",
    end: "21:30",
    time: "6:30 – 9:30 PM",
    venue: "Smash'd",
    address: "520 E Grayson St, San Antonio, TX 78215",
    entry: "$5 entry",
    highlights: [
      "Live music by Austin Ausley",
      "Drink ticket for the first 25",
      "Happy hour until 8 PM",
      "Free parking",
    ],
    blurb:
      "Professionals, entrepreneurs, and leaders — one room, one night of real conversations.",
    flyer: letsConnectNov,
    flyerAlt:
      "Let's Connect — Wednesday live music featuring Austin Ausley, Nov 18, 2026, 6:30–9:30 PM at 520 E Grayson. Entry $5.",
    rsvpUrl: "https://lets-connect.creativeiqmarketing.com/",
  },
  {
    id: "carshow-2026-10",
    name: "Dominion Rotary Car Show",
    kind: "Car show · Blood drive",
    host: "San Antonio Dominion Rotary",
    date: "2026-10-10",
    time: "8 AM – 2 PM",
    venue: "South Texas Blood & Tissue",
    address: "6211 I-10 Bldg 2, San Antonio, TX 78201",
    flyer: carShow,
    flyerAlt: "3rd Annual Dominion Rotary Car Show & Blood Drive, October 10, 2026",
  },
  {
    id: "lets-connect-2026-08",
    name: "Let's Connect",
    kind: "Networking · Live music",
    host: "Key Partner Network",
    date: "2026-08-19",
    time: "6:30 – 9:30 PM",
    venue: "Smash'd",
    address: "520 E Grayson St, San Antonio, TX 78215",
    flyer: letsConnectAug,
    flyerAlt: "Let's Connect by Key Partner Network, August 19, 2026",
  },
  {
    id: "business-unplugged-2026-08",
    name: "Business Unplugged",
    kind: "Networking · Cocktails",
    host: "Ana Banda & CreativeIQ",
    date: "2026-08-06",
    time: "5:30 – 8 PM",
    venue: "Hotel Valencia Riverwalk",
    address: "150 E Houston St, San Antonio, TX 78205",
    flyer: businessUnplugged,
    flyerAlt: "Business Unplugged at Hotel Valencia Riverwalk, August 6, 2026",
  },
];

const TZ = "America/Chicago";

/** Today's date in San Antonio as YYYY-MM-DD. */
function todayInSA(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(now);
}

export function splitEvents(now = new Date()) {
  const today = todayInSA(now);
  const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  return {
    upcoming: sorted.filter((e) => e.date >= today),
    past: sorted.filter((e) => e.date < today).reverse(),
  };
}

export function daysUntil(date, now = new Date()) {
  const [y, m, d] = todayInSA(now).split("-").map(Number);
  const [ty, tm, td] = date.split("-").map(Number);
  return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(y, m - 1, d)) / 86400000);
}

export function eventDateParts(date) {
  const dt = new Date(`${date}T12:00:00Z`);
  const f = (o) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...o }).format(dt);
  return {
    weekday: f({ weekday: "long" }),
    month: f({ month: "short" }),
    day: f({ day: "numeric" }),
    year: f({ year: "numeric" }),
    long: f({ month: "long", day: "numeric", year: "numeric" }),
  };
}

/** Google Calendar link (no account data, opens in a new tab). */
export function googleCalendarUrl(e) {
  const stamp = (t) => `${e.date.replaceAll("-", "")}T${t.replace(":", "")}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.name,
    dates: `${stamp(e.start)}/${stamp(e.end)}`,
    ctz: TZ,
    location: `${e.venue}, ${e.address}`,
    details: `${e.blurb}\n\nRSVP: ${e.rsvpUrl}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
