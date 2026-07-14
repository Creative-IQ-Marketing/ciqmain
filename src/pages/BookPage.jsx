import SEO from "../components/SEO";
import Booking from "../components/landing/Booking";

export default function BookPage() {
  return (
    <>
      <SEO
        title="Book a Strategy Call | CreativeIQ"
        description="Schedule a strategy call with CreativeIQ. Discuss your growth goals and map a plan for SEO, web, content, and marketing systems."
        canonical="https://creativeiq.marketing/book"
      />
      <Booking />
    </>
  );
}
