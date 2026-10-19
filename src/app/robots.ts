import type { MetadataRoute } from "next";
import { IS_INDEXABLE, SITE_URL } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  // Vercel previews / local builds: keep everything out of search engines
  if (!IS_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
