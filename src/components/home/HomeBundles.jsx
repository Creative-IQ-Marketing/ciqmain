import BundleOffers from "../services/BundleOffers";

/** Sits directly under the hero. Full comparison lives on /bundles. */
export default function HomeBundles() {
  return (
    <BundleOffers
      variant="home"
      id="home-bundles"
      eyebrow="The three systems"
      title="Three bundles."
      titleAccent="One loop."
      lede="Get found, capture the lead, nurture it, and prove the work. Launch, Growth, and Authority are how we sell that loop — website, SEO, social, and CRM in one system."
    />
  );
}
