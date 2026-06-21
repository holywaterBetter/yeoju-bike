import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/siteMetadata";

export const dynamic = "force-static";

const lastModified = new Date("2026-06-21");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteSiteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteSiteUrl("/courses/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteSiteUrl("/reservation/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
