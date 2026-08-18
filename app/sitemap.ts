import type { MetadataRoute } from "next";
import { env } from "@/lib/config/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/makeup", "/classes", "/colour-analysis", "/stitching"];
  return routes.map((route) => ({
    url: `${env.siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
