export type IndustryKey =
  | "paper"
  | "polymer"
  | "engineering"
  | "food"
  | "testing"
  | "others";

export type Participant = {
  id: number;
  name: string;
  industry?: IndustryKey; // undefined => industry type not available, only company name is shown
};

// Format: "Company Name|code"  (code blank = no industry type)
// P = Paper & Allied, L = Polymer & Plastics, E = Engineering,
// F = Food Processing, T = Testing, O = Others
const RAW = `
7I Creation|
A One House & Furniture|
Aaditya Kraft & Papers Private Limited|P
Ad Resources Private Limited|P
Ad9 Synthetic & Sports Private Limited|L
Adi Durga Steel Pvt Ltd|E
Aflex|L
Akm Technologies Private Limited|L
Akshaya Engineering Udyog|E
Alfa Enterprises|E
Ankit Enterprises|E
Aranya Paridhi (Opc) Private Limited|O
Arta Tradeline Private Limited|L
Ashok Cardboard And Containers Private Limited|P
Asutosh Industries|E
B. S. Caterers|F
Behera Refrigeration (I) Private Limited|E
Bhagya Laxmi Industries|P
Bhavana Packagings Private Limited|P
Bidyut Enterprises|E
Biriyani Box India Private Limited|F
Biswanath Chemicals|O
Bisweswar Foods Private Limited|F
BKG Corrugating Rolls|P
Bm Textile|O
Brite Machinery|E
Brothers Equipment And Engineering Private Limited|E
Bry Air|E
Carbonout Techcom Private Limited|O
Cef Engineering|E
Chakadola Estates (P) Ltd|O
Chakadola Polymers Private Limited|L
Chalachitra Jagat|O
Chandra Sekhar Mishra|O
Chocolaca|F
Chocolaca Enterprises Llp|F
Cowbit Technologies Private Limited|O
Davik Food And Beverages Private Limited|F
Devikrupa Industries|E
Diamond Polymers|L
Dimples Rasoi|F
Divine Enterprises|F
Divya Multigrains Private Limited|F
Diyani Engineering|E
Eastern Engineering|E
Fastech Fashions Private Limited|L
Flora Fountains|O
Futech Machinery Private Limited|E
G-On Energy Controls|E
Gayatridevi Foods And Beverages Private Limited|F
Gitanjali Awards Pvt. Ltd|O
Glamupbysonalii Private Limited|O
Glaze Plastic Industries|L
Global Printers|P
Goma Engineering|E
Gorecycle Private Limited|L
Grand Industries|O
Green Vision|O
Gurprit Enterprises Private Limited|E
Gurucharan Industries|L
Health Food|F
Health Food Product Private Limited|F
Healthy Hub|F
Hh Ventures|O
Impulse Electric|E
Indian Oil Corporation Limited (IOCL)|L
Indian Plastic Industries|L
Indian Service Industry|O
Inkbird Packaging Pvt Ltd|P
Innotech Packaging Private Limited|P
J S Industries|L
Jagadamba Polymers|L
Jasomati Panda|O
Jaytech Solar Systems Private Limited|O
JBS Engineering|E
Jetmark Systems Private Limited|E
JK Paper Limited|P
Kalinga Gases Private Limited|O
Kanchan Plastics Private Limited|L
Kar & Brothers|E
Kar Brothers Electric|E
Kasi Sales|E
Keshuv Informatics|E
Kiran Furnitures|E
Kirti Industrial Enterprise|E
Kitchenette|E
Kundan Steel|E
Lalita Infratech|O
Laxmi Coir Products|O
Leotronix Power|E
Liasotech Private Limited|E
Lisa Plastics|L
LMI India|P
Lovely Plastics|L
Maa Arnapurna Flour Mill|F
Maa Arts|O
Maa Durga Enterprises|E
Maa Mangala Packaging|P
Macwell|E
Mahanadi Coalfields Limited (MCL)|O
Mahindra - Sumit|O
Mayur Electro Ceramics Private Limited|O
Mechatronics Machinery And Tools India|E
Mohan Infinity|O
Mom & Baby Care|O
Murarka Biscuits Private Limited|F
Naaritva|O
National Engineering Works|E
Nayak Foods & Agrotech Private Limited|F
Nexbricks Engineering Private Limited|E
Nexus Engineering|E
Nisarga Bliss Pvt. Ltd|O
NKL Engineering|E
Nutech Graphics Private Limited|P
Odesi Handlooms And Handicrafts Private Limited|O
Odisha Solutions Private Limited|E
Oditech Solutions|E
Om Enterprises|E
Om Maa Tarini Fabrication|E
Om Pack Food Private Limited|F
Om Sai Subhashree Packaging System|E
Orissa Plasto Pipes Private Limited|L
Packmart|O
Palit Equipment Sales Private Limited|E
Patel & Co|E
Payal Steel Industries|E
Peekay Electronics|E
Perfect Polymers|L
Pioneer Manufacturing Corporation|E
Pipext International|L
Pramila Suppliers|O
Pressels Private Limited|E
Prince Steel Industries|E
Print-Tech Offset Private Limited|P
Priorities Made Easy Technology Private Limited|O
R.D.Engineering & Technology|E
R.D.Engineering Works|E
Radhaa Bharat Creations|O
Rajhans Plastic Machinery Private Limited|L
Recycle Plastics|L
Rizi Plastic|L
Rizi Plastic Machinery|L
Rollex Paints & Chemicals Pvt. Ltd|O
Roos Tempkool Ltd|E
Ruian Zhenjing Machinery Private Limited|E
S.K Sahoo|O
Sabat Exports Private Limited|O
Sai Adarsh Traders|O
Sai Engineering|E
Sai Fabricator|E
Sai Kamal Prints|P
Sai Ortho Aids|O
Sambalpuri Divaa|O
Sambeet Equipments|E
Sanjukta Food Products|F
Saraswati Agrotech|O
Sarkar Engineering Works|E
Sasg Uv Solutions Pvt. Ltd|E
Satyabhama Industries|O
Satyam Packers & Processors Private Limited|O
Seetaleswari Printers|P
Shakti Stabilizer|E
Shield Knife Company|E
Shoukeen Industries|O
Shree Balaji Udyog|O
Siddharth Plastic Industries|L
Singla Industries|O
Sky Engineering Company|E
Skyadds|O
Skyadds Sangita Kumari Sahu|O
Somdev & Company|O
Sonydig Technology Private Limited|O
Soul By Indian Private Limited|O
Spd International|L
Spectrum Poly Print|L
Spk-Mak Technologies Pvt. Ltd|P
Sri Jagannath Digital World|P
Sri Sidhivinayak Industries|E
Sri Vinayaka Engineering & Agricultural Implements|E
Ss Industries|E
Ss Paper Crafts|P
Suan Scientific Instruments|T
Subhamay Subham|O
Subhra Shakti Industries|O
Sun Metal Corporation|O
Sunrise Global|O
Sunshield Energy|O
Super Singla / Singla Industries|O
Super Singla Enterprises|O
Suraj Plastic|L
Sushama Steels|O
Swastik Plastic Industries|L
Swatishree'S Innovation Private Limited|O
Tempcon|E
The Food Gala|F
Tribe Delight Private Limited|F
Twibchem Industries|O
Uflex Ltd|L
Unique Packaging|P
Universal Spices & Pulses Industries|F
Urmee Food Products|F
Urmee Ventures Private Limited|O
Utkal Packaging Industries|P
Utkal Tarpaulin Industries|L
Vastu Industries|O
Venus Steel Furnituires|O
Vin Poly Technologies Pvt Ltd|L
Virtue Polyproducts|L
Volcano Flexi Tech Industries|L
Xyph Ventures Private Limited|O
`;

const CODE: Record<string, IndustryKey> = {
  P: "paper",
  L: "polymer",
  E: "engineering",
  F: "food",
  T: "testing",
  O: "others",
};

export const participants: Participant[] = RAW.trim()
  .split("\n")
  .map((line, i) => {
    const idx = line.lastIndexOf("|");
    const name = line.slice(0, idx).trim();
    const code = line.slice(idx + 1).trim();
    return { id: i + 1, name, industry: CODE[code] };
  });

export const industryMeta: Record<
  IndustryKey,
  { label: string; full: string; color: string }
> = {
  paper: {
    label: "Paper & Allied",
    full: "Paper & Allied Paper Product / Machinery",
    color: "#EB622F",
  },
  polymer: {
    label: "Polymer & Plastics",
    full: "Polymer & Plastics Products / Machinery",
    color: "#15A7AE",
  },
  engineering: {
    label: "Engineering",
    full: "Engineering",
    color: "#1F3864",
  },
  food: {
    label: "Food Processing",
    full: "Food Processing",
    color: "#D97706",
  },
  testing: { label: "Testing", full: "Testing", color: "#6b7280" },
  others: { label: "Others", full: "Others", color: "#6b7280" },
};