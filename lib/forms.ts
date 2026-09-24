import { z } from "zod";
export type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  hint?: string;
  max?: number;
  min?: number;
  words?: number;
};
const f = (
  name: string,
  label: string,
  type = "text",
  required = true,
  extra: Partial<Field> = {},
): Field => ({ name, label, type, required, ...extra });
const person = [
  f("name", "Full name"),
  f("email", "Email address", "email"),
  f("phone", "Mobile number", "tel"),
  f("company", "Company / organization"),
];
const stall = [
  f("company", "Company name"),
  f("stall", "Stall number"),
  f("email", "Contact email", "email"),
];
const address = [
  f("address", "Address line 1"),
  f("address2", "Address line 2", "text", false),
  f("city", "City"),
  f("state", "State / region"),
  f("postalCode", "Postal code"),
  f("country", "Country"),
];
const sectors = [
  "Plastic & polymers",
  "Printing & converting",
  "Papaer industry",
  "Packaging industry",
  "Food processing",
  "Engineering",
  "Other",
];
export const forms: Record<
  string,
  { title: string; intro: string; fields: Field[]; button: string }
> = {
  "contact-us": {
    title: "Send us a message",
    intro:
      "Have a question about participating? Get in touch with the exhibition team.",
    button: "Send enquiry",
    fields: [
      ...person,
      f("subject", "Enquiry about", "select", true, {
        options: [
          "Exhibiting",
          "Visiting",
          "Exhibitor services",
          "Brochure",
          "Other",
        ],
      }),
      f("message", "Your message", "textarea"),
    ],
  },
  "exhibitor-registration": {
    title: "Book your place on the show floor",
    intro:
      "Tell us about your company and space requirements. The team will follow up on stall availability and participation details.",
    button: "Submit exhibitor enquiry",
    fields: [
      ...person,
      f("designation", "Designation"),
      ...address,
      f("website", "Company website", "url", false),
      f("sector", "Industry sector", "select", true, { options: sectors }),
      f("products", "Products / services to exhibit", "textarea"),
      f("area", "Preferred stall area (sq. m.)", "number", true, {
        max: 10000,
      }),
      f("booth", "Booth preference", "select", true, {
        options: ["Shell scheme", "Raw space", "Please advise"],
      }),
      f("message", "Additional requirements", "textarea", false),
    ],
  },
  "visitor-registration": {
    title: "Register your visit",
    intro:
      "Share your professional details to register for Propack Odisha 2027. Keep the private pass link shown after registration.",
    button: "Register as visitor",
    fields: [
      ...person,
      f("designation", "Designation"),
      f("city", "City"),
      f("country", "Country"),
      f("sector", "Industry sector", "select", true, { options: sectors }),
      f("interest", "What are you looking for?", "textarea", false),
    ],
  },
  brochure: {
    title: "Explore the exhibition brochure",
    intro:
      "Explore the latest 2027 brochure for complete event information and organizer details.",
    button: "Request brochure access",
    fields: [
      ...person,
      f("interest", "I am interested in", "select", true, {
        options: ["Exhibiting", "Visiting", "Industry information"],
      }),
    ],
  },
  "power-requirement": {
    title: "Plan your stall’s power supply",
    intro:
      "Submit your electrical and machinery requirements for review. The organizers will confirm current rates and availability.",
    button: "Submit power requirements",
    fields: [
      ...stall,
      f("name", "Contact person name"),
      f("phone", "Contact person phone", "tel"),
      f("compressor", "Compressor required?", "select", true, {
        options: ["Yes", "No"],
      }),
      f("booth", "Type of booth", "select", true, {
        options: ["Shell scheme", "Raw space"],
      }),
      f("buildupPhase", "Buildup days phase", "select", true, {
        options: ["1 Phase", "3 Phase"],
      }),
      f("showPhase", "Show days phase", "select", true, {
        options: ["1 Phase", "3 Phase"],
      }),
      f("buildupPower", "Buildup days power (kW)", "number", true, {
        min: 0,
        max: 10000,
      }),
      f("showPower", "Show days power (kW)", "number", true, {
        min: 0,
        max: 10000,
      }),
      f("machines", "Number of machines", "number", true, {
        min: 0,
        max: 1000,
      }),
      f("machineWeight", "Total weight of machines (kg)", "number", true, {
        min: 0,
        max: 1000000,
      }),
      f(
        "weightDetails",
        "Individual machine weights / details",
        "textarea",
        false,
      ),
    ],
  },
  "fasisca-name": {
    title: "Your name, above your stall",
    intro:
      "Enter the company name exactly as it should appear on your fascia. Please check spelling and capitalization before submitting.",
    button: "Submit fascia name",
    fields: [
      ...stall,
      f("fascia", "Name on fascia", "text", true, { max: 100 }),
    ],
  },
  "exhibitor-badges": {
    title: "Get your team ready",
    intro:
      "Request badges for up to six team members. Include the name and designation of each person attending.",
    button: "Request exhibitor badges",
    fields: [
      ...stall,
      f("phone", "Phone number", "tel"),
      f("name", "Requestor name"),
      f("designation", "Requestor designation"),
      f("badgeCount", "Number of badges required", "select", true, {
        options: ["1", "2", "3", "4", "5", "6"],
      }),
      ...Array.from({ length: 6 }, (_, i) => [
        f(`person${i + 1}Name`, `Person ${i + 1} — full name`, "text", false),
        f(
          `person${i + 1}Designation`,
          `Person ${i + 1} — designation`,
          "text",
          false,
        ),
      ]).flat(),
    ],
  },
  "profile-for-exhibitor-directory": {
    title: "Introduce your company",
    intro:
      "Provide your listing details for the exhibitor directory. Keep your profile concise and check all contact information.",
    button: "Submit directory profile",
    fields: [
      f("company", "Company name"),
      ...address,
      f("telCountry", "Telephone country code", "text", false),
      f("telCity", "Telephone city code"),
      f("telephone", "Telephone number", "tel"),
      f("website", "Website", "url", false),
      f("ceo", "CEO / director name"),
      f("ceoEmail", "CEO / director email", "email"),
      f("name", "Contact person name"),
      f("designation", "Contact person designation"),
      f("email", "Contact person email", "email"),
      f("phone", "Contact person mobile", "tel"),
      f("principal", "Principal company name", "text", false),
      f("logo", "Company logo", "file", true, {
        hint: "PNG or JPEG, maximum 2 MB. Files are stored privately.",
      }),
      f("profile", "Company profile / products / services", "textarea", true, {
        words: 99,
      }),
      f("products", "Products on display", "textarea", false, { words: 50 }),
      f("launches", "New launches", "textarea", false, { words: 20 }),
    ],
  },
  "stall-design": {
    title: "Submit your stall design",
    intro:
      "Share your vendor details and design for organizer review. Submission does not constitute design approval.",
    button: "Submit for review",
    fields: [
      f("vendor", "Vendor name"),
      ...address,
      f("company", "Exhibiting company"),
      f("stall", "Stall number"),
      f("email", "Contact email", "email"),
      f("phone", "Contact phone", "tel"),
      f("design", "Stall design", "file", true, {
        hint: "PDF, PNG or JPEG, maximum 2 MB. Files are stored privately.",
      }),
    ],
  },
};
export function schemaFor(type: string) {
  const form = forms[type];
  if (!form) throw new Error("Unknown form");
  const shape: Record<string, z.ZodType> = {};
  for (const field of form.fields) {
    if (field.type === "file") continue;
    let s = z
      .string()
      .trim()
      .max(
        field.max && field.type !== "number"
          ? field.max
          : field.type === "textarea"
            ? 4000
            : 250,
        "Please shorten this entry.",
      );
    if (field.required) s = s.min(1, "This field is required.");
    let v: z.ZodType = s;
    if (field.type === "email")
      v = s.refine(
        (x) => (!x && !field.required) || z.email().safeParse(x).success,
        "Enter a valid email address.",
      );
    if (field.type === "tel")
      v = s.refine(
        (x) =>
          (!x && !field.required) ||
          (/^[+\d() .-]{6,25}$/.test(x) && x.replace(/\D/g, "").length >= 6),
        "Enter a valid phone number.",
      );
    if (field.type === "url")
      v = s.refine(
        (x) => !x || (/^https?:\/\//.test(x) && z.url().safeParse(x).success),
        "Enter a full http:// or https:// URL.",
      );
    if (field.type === "select")
      v = s.refine(
        (x) => field.options?.includes(x),
        "Choose an option from the list.",
      );
    if (field.type === "number")
      v = s.refine(
        (x) =>
          /^\d+(\.\d{1,2})?$/.test(x) &&
          Number(x) >= (field.min ?? 0.01) &&
          Number(x) <= (field.max || 10000),
        `Enter a number between ${field.min ?? 0.01} and ${field.max || 10000}.`,
      );
    if (field.words)
      v = s.refine(
        (x) => !x || x.split(/\s+/).length <= field.words!,
        `Use ${field.words} words or fewer.`,
      );
    shape[field.name] = field.required ? v : v.default("");
  }
  shape.consent = z.literal("yes", {
    error: "Please agree to the privacy notice.",
  });
  return z.object(shape).superRefine((data, ctx) => {
    if (type === "exhibitor-badges") {
      for (let i = 1; i <= Number(data.badgeCount); i++) {
        for (const suffix of ["Name", "Designation"])
          if (!data[`person${i}${suffix}`])
            ctx.addIssue({
              code: "custom",
              path: [`person${i}${suffix}`],
              message: "Required for each requested badge.",
            });
      }
    }
  });
}
