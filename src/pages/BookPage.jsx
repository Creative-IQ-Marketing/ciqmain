import SEO from "../components/SEO";
import Booking from "../components/landing/Booking";
import PageHeader from "../components/layout/PageHeader";

export default function BookPage() {
  return (
    <>
      <SEO
        title="Book a Strategy Call | CreativeIQ"
        description="Schedule a strategy call with CreativeIQ. Discuss your growth goals and map a plan for SEO, web, content, and marketing systems."
        canonical="https://creativeiqmarketing.com/book"
      />
      <PageHeader
        eyebrow="Book a call"
        title="Schedule your"
        titleAccent="strategy call."
        description="Pick a time that works. We'll discuss your goals and map a plan across SEO, web, content and systems."
      />
      <Booking />
    </>
  );
}
