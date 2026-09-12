import { OrganizersContent } from "@/components/pages/about-organizers";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const page = contentPages["about-organizers"];
export const metadata = pageMetadata(
  "about-organizers",
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug="about-organizers">
      <OrganizersContent />
    </ContentPage>
  );
}
