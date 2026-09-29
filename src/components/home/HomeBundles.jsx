import BundleOffers from "../services/BundleOffers";

/** Sits directly under the hero. Full comparison lives on /bundles. */
export default function HomeBundles() {
  return (
    <BundleOffers
      variant="home"
      id="home-bundles"
      eyebrow="Find your system"
      title="Pick the"
      titleAccent="right system."
      lede="Get found, capture the lead, nurture it, and prove the work. Launch, Growth, and Authority — website, SEO, social, and CRM in one loop."
    />
  );
}
