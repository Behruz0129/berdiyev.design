"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { useLocale } from "@/contexts/LocaleContext";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLocale();
  const title = t(`projects.${project.slug}.title`) || project.title;
  const role = t(`projects.${project.slug}.role`) || project.role;
  const shortDescription = t(`projects.${project.slug}.shortDescription`) || project.shortDescription;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="glass group block h-full rounded-2xl overflow-hidden focus-visible:focus-ring"
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={project.heroImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-90" />
          <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
            {project.year}
          </div>
        </div>

        <div className="min-w-0 p-4 sm:p-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="min-w-0 flex-1">
              <div className="break-words text-base font-medium tracking-tight text-foreground">
                {title}
              </div>
              <div className="mt-1 break-words text-sm text-foreground/60">{role}</div>
            </div>
          </div>
          <p className="mt-4 break-words text-sm leading-6 text-foreground/70">
            {shortDescription}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--grad-b)] shadow-[0_0_18px_color-mix(in_oklab,var(--grad-b)_55%,transparent)]" />
            <span className="transition-colors group-hover:text-foreground">
              {t("projects.viewDetails")}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

