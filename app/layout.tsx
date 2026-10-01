import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const siteUrl = "https://www.propackodisha.com";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const headingFont = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#1F3864",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "PROPACK Odisha 2027 | Packaging, Printing & Plastics Expo Bhubaneswar",
    template: "%s | PROPACK Odisha 2027",
  },

  description:
    "PROPACK Odisha 2027 is a B2B exhibition for packaging, printing, plastics, processing and allied technologies, taking place from 25–28 February 2027 at Janata Maidan, Bhubaneswar, Odisha.",

  applicationName: "PROPACK Odisha 2027",

  authors: [
    {
      name: "PROPACK Odisha",
      url: siteUrl,
    },
  ],

  creator: "PROPACK Odisha",
  publisher: "PROPACK Odisha",

  keywords: [
    "PROPACK Odisha 2027",
    "Packaging Expo Odisha",
    "Packaging Exhibition Bhubaneswar",
    "Packaging Machinery Exhibition Odisha",
    "Printing Exhibition Odisha",
    "Printing Expo Bhubaneswar",
    "Plastics Exhibition Odisha",
    "Processing Machinery Exhibition",
    "Food Processing Exhibition Odisha",
    "Packaging Printing Plastics Expo",
    "Industrial Exhibition Bhubaneswar",
    "Trade Fair Odisha 2027",
    "B2B Exhibition Odisha",
    "MSME Exhibition Odisha",
    "OASME Exhibition",
  ],

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "ZGOLeZNrqEwGJ66Y2ekZXJNSdLnFkl9HquA6-rbTWDo",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "PROPACK Odisha",
    title:
      "PROPACK Odisha 2027 | Packaging, Printing & Plastics Expo Bhubaneswar",
    description:
      "Explore packaging, printing, plastics, processing and allied technologies at PROPACK Odisha 2027, 25–28 February at Janata Maidan, Bhubaneswar.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PROPACK Odisha 2027 International Exhibition",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "PROPACK Odisha 2027 | Packaging, Printing & Plastics Expo",
    description:
      "25–28 February 2027 at Janata Maidan, Bhubaneswar, Odisha.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "Trade Exhibition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "PROPACK Odisha",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
    description:
      "PROPACK Odisha is a B2B exhibition focused on packaging, printing, plastics, processing and allied technologies.",
    organizer: {
      "@type": "Organization",
      name: "Odisha Assembly of Small and Medium Enterprises (OASME)",
      url: "https://www.oasme.org.in",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "PROPACK Odisha",
    alternateName: "PROPACK Odisha International Expo",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-IN",
  };

  return (
    <html
      lang="en-IN"
      className={`${bodyFont.variable} ${headingFont.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#f7f8f7] font-sans text-[#1F3864] selection:bg-[#EB622F] selection:text-white">
        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}