import type { NextConfig } from "next";
const config: NextConfig = {
  serverExternalPackages: ["mongodb", "nodemailer"],
  outputFileTracingIncludes: {
    "/api/brochure": ["./private/brochure-2023.pdf"],
  },
  async redirects() {
    return [
      { source: "/exhibit", destination: "/exhibitors", permanent: true },
      { source: "/visit", destination: "/visitors", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/view_pass", destination: "/view-pass", permanent: true },
      { source: "/retrieve_pass", destination: "/view-pass", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default config;
