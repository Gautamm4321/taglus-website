/**
 * Public site URL used for canonical links, Open Graph, sitemap and robots.
 *
 * Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://www.your-domain.com) once the production
 * domain is decided. Until then Vercel's own production URL is used, and locally localhost.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return `https://${vercelProd.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Taglus";

/** Only the real production deployment should be indexed (not Vercel previews or localhost). */
export const IS_INDEXABLE =
  process.env.VERCEL_ENV === "production" || process.env.ALLOW_INDEXING === "true";

export const CONTACT = {
  phone: "+91 99309 05047",
  phoneHref: "tel:+919930905047",
  email: "info@taglus.com",
  whatsapp: "https://wa.me/919930905047",
  address: {
    streetAddress: "103, Akruti Arcade, J.P. Road, Andheri (West)",
    addressLocality: "Mumbai",
    postalCode: "400053",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
};

export const SOCIAL_LINKS = [
  "https://www.instagram.com/taglus_official/",
  "https://www.linkedin.com/company/tagluscom/",
  "https://www.youtube.com/@taglus",
  "https://x.com/Taglus_Official",
];
