import { SectorsContent } from "@/components/pages/sectors";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const page = contentPages["sectors"];
export const metadata = pageMetadata(
  "sectors",
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug="sectors">
      <SectorsContent />
    </ContentPage>
  );
}
