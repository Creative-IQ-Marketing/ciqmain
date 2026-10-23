import { useEffect } from "react";
import SEO from "../components/SEO";

const CSE_ID = "55f93925575f04391";
const CSE_SRC = `https://cse.google.com/cse.js?cx=${CSE_ID}`;

export default function SearchPage() {
  useEffect(() => {
    if (document.querySelector(`script[src="${CSE_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = CSE_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <>
      <SEO
        title="Search | CreativeIQ"
        description="Search the CreativeIQ website for services, guides and blog posts."
        canonical="https://creativeiqmarketing.com/search"
        noindex
      />
      <section className="mx-auto max-w-3xl px-4 pb-20 pt-32 md:pt-40">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Search CreativeIQ
        </h1>
        <div className="mt-8 min-h-[24rem]">
          <div className="gcse-search" />
        </div>
      </section>
    </>
  );
}
