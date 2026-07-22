"use client";

/**
 * TableOfContents — extracts H2/H3 from markdown content and renders sticky TOC
 */

import { useEffect, useState } from "react";
import { cn } from "@/utils";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function extractHeadings(content: string): TOCItem[] {
  const lines = content.split("\n");
  const items: TOCItem[] = [];

  lines.forEach((line) => {
    const h2Match = line.match(/^## (.+)$/);
    const h3Match = line.match(/^### (.+)$/);
    if (h2Match) {
      const text = h2Match[1].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      items.push({ id, text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      items.push({ id, text, level: 3 });
    }
  });

  return items;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <aside
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="h-4 w-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-bold text-foreground">Contents</h2>
      </div>
      <nav>
        <ol className="flex flex-col gap-1.5">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block text-xs leading-relaxed transition-all duration-200",
                  level === 3 ? "pl-3" : "",
                  activeId === id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={activeId === id ? "location" : undefined}
              >
                {text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
