import { AboutContent } from "@/components/pages/about";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const page = contentPages["about"];
export const metadata = pageMetadata(
  "about",
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug="about">
      <AboutContent />
    </ContentPage>
  );
}
