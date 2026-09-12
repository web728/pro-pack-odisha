import source from "./source-content.json";
export function profileList(slug: string, marker: string) {
  const page = source.find((p) => p.slug === slug);
  return (page?.content.split(marker)[1] || "")
    .replace(
      /Laboratory, Testing &\s+Measurement Equipment/g,
      "Laboratory, testing & measurement equipment",
    )
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}
export const exhibitorProfiles = profileList(
  "/exhibitors",
  "EXHIBITOR'S PROFILE",
).map((x) =>
  x === "Liquid PackagingLiquid Processing"
    ? "Liquid packaging & liquid processing"
    : x,
);
export const visitorProfiles = profileList("/visitors", "VISITOR'S PROFILE");
