import { VisitorsContent } from "@/components/pages/visitors";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const page = contentPages["visitors"];
export const metadata = pageMetadata(
  "visitors",
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug="visitors">
      <VisitorsContent />
    </ContentPage>
  );
}
