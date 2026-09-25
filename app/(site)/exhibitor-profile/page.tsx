import { ExhibitorProfileContent } from "@/components/pages/exhibitor-profile";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages, type ContentPageSlug } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const slug = "exhibitor-profile" as ContentPageSlug;
const page = contentPages[slug] || {
  label: "Exhibitor Profile",
  description: "Indicative and not restrictive categories for PROPACK Odisha 2027 exhibitors.",
};

export const metadata = pageMetadata(
  slug,
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug={slug}>
      <ExhibitorProfileContent />
    </ContentPage>
  );
}