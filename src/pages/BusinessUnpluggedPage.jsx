import SEO from "../components/SEO";
import BusinessUnplugged from "../components/landing/BusinessUnplugged";

export default function BusinessUnpluggedPage() {
  return (
    <>
      <SEO
        title="Business Unplugged | RSVP — Creative IQ"
        description="RSVP for Business Unplugged — August 6 at Hotel Valencia Riverwalk, San Antonio. An evening of connection, conversation, and cocktails."
        canonical="https://creativeiq.marketing/business-unplugged"
      />
      <BusinessUnplugged />
    </>
  );
}
