
import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import { event, seoUrl } from "@/lib/site";
import { searchPages } from "@/lib/seo";

import "./globals.css";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const headingFont = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
  weight: ["500", "600", "700", "800"],
});

const siteUrl = new URL(seoUrl);
const home = searchPages[""];

const ogImageUrl = new URL(
  event.ogImage,
  siteUrl
).toString();

const siteName = event.fullName;
const organizationName = event.organizer.name;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F3864",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,

  title: {
    default: home.title,
    template: "%s | PROPACK Odisha 2027",
  },

  description: home.description,

  applicationName: event.name,

  authors: [
    {
      name: organizationName,
      url: event.organizer.url,
    },
  ],

  creator: organizationName,
  publisher: organizationName,

  category: "Trade Exhibition",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  verification: {
    google:
      "ZGOLeZNrqEwGJ66Y2ekZXJNSdLnFkl9HquA6-rbTWDo",
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

  openGraph: {
    type: "website",
    locale: "en_IN",

    url: siteUrl.toString(),
    siteName,

    title: home.title,
    description: home.description,

    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt:
          "PROPACK Odisha 2027 International Exhibition at Janata Maidan, Bhubaneswar, 25–28 February 2027",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: home.title,
    description: home.description,

    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${bodyFont.variable} ${headingFont.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#f7f8f7] font-sans text-[#1F3864] selection:bg-[#EB622F] selection:text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#1F3864] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <Header />

        <main
          id="main"
          className="flex-1"
        >
          {children}
        </main>

        <Footer />

        <GoogleAnalytics gaId="G-ZY3WJHWQBC" />
      </body>
    </html>
  );
}
