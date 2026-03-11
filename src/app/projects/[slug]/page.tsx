import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { ProjectDetailContent } from "@/components/ProjectDetailContent";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.shortDescription };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetailContent project={project} />;
}
