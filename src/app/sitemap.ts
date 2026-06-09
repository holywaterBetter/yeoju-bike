import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/siteMetadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteSiteUrl("/"),
      lastModified: new Date("2026-06-09"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteSiteUrl("/courses/"),
      lastModified: new Date("2026-06-09"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteSiteUrl("/reservation/"),
      lastModified: new Date("2026-06-09"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
