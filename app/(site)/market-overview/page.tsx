import { MarketContent } from "@/components/pages/market-overview";
import { ContentPage } from "@/components/shared/page-shell";
import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

const page = contentPages["market-overview"];
export const metadata = pageMetadata(
  "market-overview",
  page.label,
  page.description,
);

export default function Page() {
  return (
    <ContentPage slug="market-overview">
      <MarketContent />
    </ContentPage>
  );
}
