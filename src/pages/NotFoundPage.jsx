import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page not found | CreativeIQ"
        description="The page you’re looking for doesn’t exist. Return to CreativeIQ for AI-ready digital marketing in San Antonio."
        canonical="https://creativeiqmarketing.com/"
        noindex
      />
      <section className="mx-auto max-w-2xl px-4 py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            Go home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-900 hover:bg-gray-50"
          >
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
