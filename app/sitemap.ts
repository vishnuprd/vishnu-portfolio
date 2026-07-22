import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";

const BASE = "https://vishnuprd.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogPosts } = await getSiteContent();

  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...posts,
  ];
}
