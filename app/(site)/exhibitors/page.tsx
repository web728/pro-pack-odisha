import { ExhibitorsContent } from "@/components/pages/exhibitors";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const page = contentPages["exhibitors"];
export const metadata = pageMetadata(
  "exhibitors",
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug="exhibitors">
      <ExhibitorsContent />
    </ContentPage>
  );
}
