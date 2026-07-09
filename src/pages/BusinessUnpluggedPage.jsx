import SEO from "../components/SEO";
import BusinessUnplugged from "../components/landing/BusinessUnplugged";
import { BUSINESS_UNPLUGGED_SEO } from "../constants/businessUnpluggedSeo";

export default function BusinessUnpluggedPage() {
  return (
    <>
      <SEO {...BUSINESS_UNPLUGGED_SEO} />
      <BusinessUnplugged />
    </>
  );
}
