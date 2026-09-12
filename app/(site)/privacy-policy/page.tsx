import { PrivacyContent } from "@/components/pages/privacy-policy";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const page = contentPages["privacy-policy"];
export const metadata = pageMetadata(
  "privacy-policy",
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug="privacy-policy" showCta={false}>
      <PrivacyContent />
    </ContentPage>
  );
}
