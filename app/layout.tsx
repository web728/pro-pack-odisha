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
  themeColor: "#1F3864",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://odishapropack.com"),
  title: {
    default: "PROPACK Odisha 2027 | Eastern India's Largest MSME Exhibition",
    template: "%s | PROPACK Odisha 2027",
  },
  description:
    "Join PROPACK Odisha 2027 - Eastern India's largest international exhibition on packaging, processing, printing, and plastics machinery at Janata Maidan, Bhubaneswar, Odisha.",
  keywords: [
    "PROPACK Odisha 2027",
    "Packaging Expo Bhubaneswar",
    "Food Processing Machinery Exhibition",
    "Plastics Expo Odisha",
    "OASME Exhibition",
  ],
  authors: [{ name: "OASME" }],
  creator: "Odisha Assembly of Small and Medium Enterprises (OASME)",
  publisher: "PROPACK Odisha",
  alternates: {
    canonical: "https://odishapropack.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://odishapropack.com",
    title: "PROPACK Odisha 2027 | One Expo. Endless Solutions.",
    description:
      "Eastern India's flagship B2B exhibition bringing packaging, printing, plastics, and processing value chain together.",
    siteName: "PROPACK Odisha International Expo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PROPACK Odisha 2027 International Expo Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROPACK Odisha 2027 | Bhubaneswar",
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
    name: "PROPACK Odisha 2027",
    description:
      "Eastern India's Largest MSME Exhibition on Packaging, Printing, Plastics & Processing Machinery.",
    startDate: "2027-02-25T09:00:00+05:30",
    endDate: "2027-02-28T18:00:00+05:30",
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
      name: "Odisha Assembly of Small and Medium Enterprises (OASME)",
      url: "https://www.oasme.org.in",
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
      <body className="flex min-h-screen flex-col bg-[#f7f8f7] font-sans text-[#1F3864] selection:bg-[#EB622F] selection:text-white">
      
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}