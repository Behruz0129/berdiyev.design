import type { Metadata } from "next";
import { resources, resourceCategories } from "@/data/resources";
import { ResourcesContent } from "./ResourcesContent";

const description = `A curated list of ${resources.length} design resources across ${resourceCategories.length} categories — inspiration, UI kits, design systems, icons, typefaces, colour, mockups, motion, Figma plugins and tools. Checked links only.`;

export const metadata: Metadata = {
  title: "Resources",
  description,
  alternates: { canonical: "/resources" },
  openGraph: {
    type: "website",
    title: "Resources",
    description,
    url: "/resources",
  },
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
