import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

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
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://propackodisha.com"),
  title: {
    default: "Propack Odisha 2027 | Premier Packaging & Processing Expo",
    template: "%s | Propack Odisha 2027",
  },
  description:
    "Join Eastern India's largest international exhibition on packaging, processing, printing, and plastics machinery at Bhubaneswar, Odisha.",
  keywords: [
    "Propack Odisha 2027",
    "Packaging Expo Bhubaneswar",
    "Food Processing Machinery Exhibition",
    "Plastics Expo Odisha",
    "Industrial Trade Show India",
  ],
  authors: [{ name: "Propack Odisha Team" }],
  creator: "Propack Odisha",
  publisher: "Propack Odisha",
  alternates: {
    canonical: "https://propackodisha.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://propackodisha.com",
    title: "Propack Odisha 2027 | International Packaging & Food Processing Expo",
    description:
      "Eastern India's flagship B2B exhibition bringing global industrial manufacturers and packaging innovators under one roof.",
    siteName: "Propack Odisha International Expo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Propack Odisha 2027 International Expo Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Propack Odisha 2027 | Bhubaneswar",
    description:
      "Eastern India's flagship B2B packaging & processing trade show.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Propack Odisha International Expo 2027",
    description:
      "International Exhibition on Packaging, Food Processing, Printing & Converting Machinery.",
    startDate: "2027-02-12T09:00:00+05:30",
    endDate: "2027-02-15T18:00:00+05:30",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Janata Maidan",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Propack Odisha",
      url: "https://propackodisha.com",
    },
  };

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-950 font-sans text-slate-100 selection:bg-amber-400 selection:text-slate-950">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-amber-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950 shadow-xl"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}