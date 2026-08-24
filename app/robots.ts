import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/vin is a decode proxy, not a page — there is nothing there to index,
    // and crawling it would send pointless traffic to NHTSA.
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: "https://torquesheet.com/sitemap.xml",
    host: "https://torquesheet.com",
  };
}
