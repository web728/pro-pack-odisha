// data/newsData.ts

export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  link: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
}

export interface MediaMention {
  id: string;
  source: string;
  title: string;
  date: string;
  link: string;
}

export const newsData: Record<string, Article[]> = {
  "2027": [
    {
      id: "2027-1",
      title: "PROPACK Odisha 2027 Announces Expanded Green Energy & Sustainable Packaging Pavilions",
      date: "February 14, 2027",
      category: "Exhibition Update",
      excerpt: "With over 150+ confirmed exhibitors, the upcoming 4th edition at Janata Maidan introduces dedicated zones for eco-friendly polymers, circular packaging, and solar-integrated processing machinery.",
      image: "/news/2027/preview-1.jpg",
      link: "/news/green-energy-pavilions-2027",
    },
  ],
};

// Yahan apne folders ki images ke exact filenames daal do (.jpg, .png, .webp kuch bhi ho)
export const galleryData: Record<string, GalleryImage[]> = {
  "2025": [
    { id: "g-2025-1", title: "PROPACK 2025 Exhibition View 1", image: "/news/2025/img1.jpg" },
    { id: "g-2025-2", title: "PROPACK 2025 Exhibition View 2", image: "/news/2025/img2.png" },
  ],
  "2024": [
    { id: "g-2024-1", title: "PROPACK & Odisha Plast 2024 View 1", image: "/news/2024/img1.jpg" },
    { id: "g-2024-2", title: "PROPACK & Odisha Plast 2024 View 2", image: "/news/2024/img2.webp" },
  ],
  "2023": [
    { id: "g-2023-1", title: "PROPACK 2023 Archive View", image: "/news/2023/img1.jpg" },
  ],
  "2026": [],
  "2027": [],
};

// Tumhare saare verified press links
export const pressMentions: MediaMention[] = [
  {
    id: "press-1",
    source: "Orissa Post",
    title: "PROPACK Odisha & Odisha Plast to be held in city",
    date: "2024 Edition",
    link: "https://www.orissapost.com/propack-odisha-odisha-plast-to-be-held-in-city/",
  },
  {
    id: "press-2",
    source: "Interview Times",
    title: "Bhubaneswar to host PROPACK Odisha and Odisha Plast",
    date: "2024 Edition",
    link: "https://interviewtimes.net/bhubaneswar-to-host-propack-odisha-2024-and-odisha-plast-2024/",
  },
  {
    id: "press-3",
    source: "Samaj Alive",
    title: "Pro Pack and Pro Plast in Bhubaneswar industrial expo",
    date: "2024 Edition",
    link: "https://samajalive.in/pro-pack-and-pro-plast-in-bhubaneswar/598678.html",
  },
  {
    id: "press-4",
    source: "Janata Serishta",
    title: "Propack Odisha & Odisha Plast to be organised in the city",
    date: "2024 Edition",
    link: "https://jantaserishta.com/local/odisha/propack-odisha-odisha-plast-to-be-organised-in-the-city-3534740",
  },
  {
    id: "press-5",
    source: "Fingerprint News",
    title: "Bhubaneswar to host PROPACK Odisha & Odisha Plast",
    date: "2024 Edition",
    link: "https://fingerprintnews.in/bhubaneswar-to-host-propackodisha-2024-odisha-plast-2024",
  },
  {
    id: "press-6",
    source: "Odisha Ray",
    title: "Official Conclave & Exhibition Highlights Preview",
    date: "2024 Archive",
    link: "https://odisharay.com/old/pages/single_page.php?id=45461",
  },
  {
    id: "press-7",
    source: "Odisha Ray",
    title: "Industrial Packaging & Processing Machinery Review",
    date: "2024 Archive",
    link: "https://odisharay.com/old/pages/single_page.php?id=46260",
  },
];