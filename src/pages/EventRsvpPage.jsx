import SEO from "../components/SEO";
import EventRsvpLanding from "../components/events/EventRsvpLanding";
import { getEventSeo } from "../data/activeEvent";

export default function EventRsvpPage() {
  return (
    <>
      <SEO {...getEventSeo()} />
      <EventRsvpLanding />
    </>
  );
}
