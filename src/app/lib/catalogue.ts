/** The 7 sheets in the sheet catalogue book (/catalogue), in book order. Menu links for these open the book. */
export const BOOK_SLUGS = [
  "taglus-pu-flex",
  "taglus-premium",
  "taglus-ultra",
  "taglus-tuff",
  "taglus-hard-and-soft",
  "taglus-soft",
  "taglus-smiles",
];

export const catalogueHref = (slug: string) => `/catalogue?sheet=${slug}`;

/** Machines and resin in the equipment & accessories book (/catalogue/equipment), in book order. */
export const EQUIPMENT_SLUGS = ["taglus-duoform", "taglus-autoform", "taglus-autoform-roll", "taglus-model-resin"];

/** The accessories product whose items (retainer boxes, chewies...) also go into that book */
export const ACCESSORIES_SLUG = "taglus-orthodontic-accessories";

export const equipmentHref = (id: string) => `/catalogue/equipment?sheet=${id}`;

/** Where a header menu link should go: into one of the books, or the product's own page */
export function menuHref(slug: string) {
  if (BOOK_SLUGS.includes(slug)) return catalogueHref(slug);
  if (EQUIPMENT_SLUGS.includes(slug)) return equipmentHref(slug);
  return `/products/${slug}`;
}
