/** Names and inclusions checked against kpmopulence.co.za on 5 November 2026.
 * Official listings provide no fixed prices here; demo estimates remain separate.
 */
export type OfficialPackage = {
  name: string;
  group: number;
  slug: string;
  includes: string[];
};
const banners = "Choice of Happy birthday, I love you or Bride to be banner";
export const officialPackages: OfficialPackage[] = [
  { name: "Proposal 1", group: 0, slug: "proposal-1", includes: [] },
  { name: "Proposal 2", group: 0, slug: "proposal-2", includes: [] },
  {
    name: "Roomsetup Package 1",
    group: 1,
    slug: "roomsetup-package-1",
    includes: [
      "30 ceiling balloons",
      banners,
      "20 floor balloons",
      "Heart bed décor",
    ],
  },
  {
    name: "Roomsetup Package 2",
    group: 1,
    slug: "roomsetup-package-2",
    includes: [
      "40 ceiling balloons",
      banners,
      "30 floor balloons",
      "Age balloon",
    ],
  },
  {
    name: "Roomsetup Package 3",
    group: 1,
    slug: "roomsetup-package-3",
    includes: [
      "50 ceiling balloons",
      "Age balloon",
      "4 heart balloons",
      "50 floor balloons",
      banners,
    ],
  },
  { name: "Colour roses", group: 2, slug: "colour-roses", includes: [] },
  { name: "Red Roses", group: 2, slug: "red-roses", includes: [] },
  { name: "White Roses", group: 2, slug: "white-roses", includes: [] },
  { name: "3m Balloon Arch", group: 3, slug: "3m-balloon-arch", includes: [] },
  {
    name: "Balloon Garland",
    group: 3,
    slug: "balloon-garland",
    includes: [
      "Extras are not included; styling is quoted to your requirements.",
    ],
  },
  {
    name: "Heart Box",
    group: 4,
    slug: "heart-box",
    includes: ["Ferrero Rocher chocolate", "Roses"],
  },
  { name: "I Love You Box", group: 4, slug: "i-love-you-box", includes: [] },
];
export const roomExtras = [
  "Helium-Inflated Heart Balloon",
  "Customised Lettering",
  "3-Word Rose Bed Décor",
  "1 Rose Bed Décor",
];
export const productURL = (p: OfficialPackage) =>
  "https://kpmopulence.co.za/product/" + p.slug + "/";
export const packageGroup = (occasion: string) =>
  occasion === "Romantic Proposal"
    ? 0
    : occasion === "Luxury Room Setup" || occasion === "Birthday Celebration"
      ? 1
      : occasion === "Floral Arrangement"
        ? 2
        : 4;
