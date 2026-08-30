import type { Metadata } from "next";
import { ProjectsContent } from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected UI/UX and frontend case studies — Modme.uz CRM landing page and the Islamic Civilization Center interactive exhibition systems.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
