import { ResourcesContent } from "@/components/pages/resources";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const page = contentPages["resources"];
export const metadata = pageMetadata(
  "resources",
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug="resources">
      <ResourcesContent />
    </ContentPage>
  );
}
