export const event = {
  name: "Propack Odisha",
  fullName: "Propack Odisha International Expo",
  date: "25–28 February 2027",
  venue: "Janata Maidan, Bhubaneswar, Odisha",
  phones: ["70083 41944", "77518 09433"],
  description:
    "Connect with the plastic, printing, packaging, food processing and engineering industries at Propack Odisha, 25–28 February 2027 in Bhubaneswar.",
};
export const siteUrl = process.env.SITE_URL || "https://www.propackodisha.com";
// Public search identity stays independent of the local form-request origin.
export const seoUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.propackodisha.com"
).replace(/\/$/, "");

export const sectors = [
  {
    name: "Plastic Industry",
    detail: "Raw materials, processing machinery, moulding and polymer solutions.",
    image: "plastics.webp",
  },
  {
    name: "Printing Industry",
    detail: "Printing presses, inks, labels, coding and marking technologies.",
    image: "printing.webp",
  },
  {
    name: "Packaging Industry",
    detail: "Packaging machinery, materials and complete end-of-line solutions.",
    image: "packaging.webp",
  },
  {
    name: "Paper Industry",
    detail: "Pulp manufacturing, paper production, converting and finishing lines.",
    image: "paper.webp",
  },
  {
    name: "Processing Industry",
    detail: "Processing equipment, food safety, refrigeration and storage.",
    image: "food.webp",
  },
  {
    name: "Green Energy",
    detail: "Energy-efficiency, solar and utility solutions.",
    image: "engineering.webp",
  },
];



export const services = [
  {
    slug: "power-requirement",
    title: "Power requirements",
    description:
      "Tell us about your machines, power phases and compressor requirements.",
  },
  {
    slug: "fasisca-name",
    title: "Fascia name",
    description:
      "Submit the exact company name to appear on your stall fascia.",
  },
  {
    slug: "exhibitor-badges",
    title: "Exhibitor badges",
    description: "Register up to six members of your exhibition team.",
  },
  {
    slug: "profile-for-exhibitor-directory",
    title: "Directory profile",
    description: "Share your company profile, logo, products and new launches.",
  },
  {
    slug: "stall-design",
    title: "Stall design",
    description:
      "Send your vendor details and stall design for organizer review.",
  },
];
export const publicRoutes = [
  "",
  "about",
  "sectors",
  "resources",
  "exhibitors",
  "visitors",
  "about-organizers",
  "market-overview",
  "exhibitor-details",
  "contact-us",
  "exhibitor-registration",
  "visitor-registration",
  "brochure",
  "privacy-policy",
  ...services.map((s) => s.slug),
  "view-pass",
];
