"use client";

import { motion } from "framer-motion";
import {
  Figma,
  Code2,
  Braces,
  Layers,
  Atom,
  LayoutGrid,
  FileJson2,
} from "lucide-react";

const items = [
  { label: "Figma", icon: Figma },
  { label: "HTML", icon: Code2 },
  { label: "CSS", icon: Layers },
  { label: "SCSS", icon: LayoutGrid },
  { label: "JavaScript", icon: FileJson2 },
  { label: "React", icon: Atom },
  { label: "NextJS", icon: Braces },
] as const;

export function TechStack() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
      {items.map((it) => (
        <motion.div
          key={it.label}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl px-4 py-4 flex items-center gap-3"
        >
          <it.icon className="h-4 w-4 text-foreground/80" />
          <div className="text-sm text-foreground/75">{it.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

