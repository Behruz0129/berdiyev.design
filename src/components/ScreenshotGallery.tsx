"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import type { ProjectScreenshot } from "@/data/projects";

export function ScreenshotGallery({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  const [failed, setFailed] = useState<Set<string>>(new Set());

  if (!screenshots.length) return null;

  return (
    <div className="flex w-full flex-col gap-6">
      {screenshots.map((s) => (
        <motion.div
          key={s.image}
          className="w-full overflow-hidden rounded-2xl border border-white/10 bg-foreground/5"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="border-b border-white/10 px-4 py-3">
            <div className="font-medium text-foreground">{s.title}</div>
            {s.description && (
              <div className="mt-0.5 text-sm text-foreground/60">{s.description}</div>
            )}
          </div>
          <div className="relative aspect-video w-full">
            {failed.has(s.image) ? (
              <div className="flex flex-col items-center justify-center gap-2 text-foreground/50 p-8">
                <ImageOff className="h-12 w-12" />
                <span className="text-sm">{s.title}</span>
              </div>
            ) : (
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover"
                sizes="100vw"
                onError={() => setFailed((prev) => new Set(prev).add(s.image))}
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
