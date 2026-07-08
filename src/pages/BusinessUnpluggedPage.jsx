import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { useRsvp } from "../context/RsvpContext";

/** Deep link: opens the RSVP modal and returns to home. */
export default function BusinessUnpluggedPage() {
  const navigate = useNavigate();
  const { openRsvp } = useRsvp();

  useEffect(() => {
    openRsvp();
    navigate("/", { replace: true });
  }, [navigate, openRsvp]);

  return (
    <SEO
      title="Business Unplugged | RSVP — Creative IQ"
      description="RSVP for Business Unplugged — August 6 at Hotel Valencia Riverwalk, San Antonio. An evening of connection, conversation, and cocktails."
      canonical="https://creativeiq.marketing/business-unplugged"
    />
  );
}
