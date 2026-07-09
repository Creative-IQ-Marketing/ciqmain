import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../../services/analytics";
import PageHeader, {
  PageCtaPrimary,
  PageCtaSecondary,
} from "../layout/PageHeader";
import { scrollToServicesContact } from "../../utils/formInterest";

export default function ServicesHero() {
  const navigate = useNavigate();

  const scrollToPackages = () => {
    document.getElementById("bundles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageHeader
      eyebrow="Services"
      title="Systems that grow with you."
      description="Website, SEO, social, CRM, and consulting — tiered packages and custom systems for brands ready to scale."
    >
      <PageCtaPrimary onClick={scrollToPackages}>View packages</PageCtaPrimary>
      <PageCtaSecondary
        onClick={() => scrollToServicesContact("other", "services-hero-quote")}
      >
        Get a quote
      </PageCtaSecondary>
      <PageCtaSecondary
        onClick={() => {
          trackButtonClick(
            "Services Free SEO Tool",
            "services_free_seo_tool",
            "ServicesHero",
          );
          navigate("/free-ai-seo-audit");
        }}
      >
        <span className="inline-flex items-center gap-1.5">
          Free SEO audit
          <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
        </span>
      </PageCtaSecondary>
    </PageHeader>
  );
}
