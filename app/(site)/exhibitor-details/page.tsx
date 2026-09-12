import { ServicesContent } from "@/components/pages/exhibitor-details";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const page = contentPages["exhibitor-details"];
export const metadata = pageMetadata(
  "exhibitor-details",
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug="exhibitor-details">
      <ServicesContent />
    </ContentPage>
  );
}
