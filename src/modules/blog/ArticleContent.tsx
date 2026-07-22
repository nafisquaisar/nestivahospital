"use client";

/**
 * ArticleContent — renders markdown-like blog content with styled headings,
 * paragraphs, lists, blockquotes, and tables. Adds IDs to H2/H3 for TOC anchors.
 * Uses a simple markdown renderer — no external library needed.
 */

import { useMemo } from "react";
import { cn } from "@/utils";

interface ArticleContentProps {
  content: string;
  className?: string;
}

function makeId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Convert a line of markdown to React-renderable HTML string.
 *  Handles inline: **bold**, *italic*, `code`, [text](url)
 */
function parseInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline decoration-primary/30 hover:decoration-primary" target="_blank" rel="noopener noreferrer">$1</a>');
}

function renderContent(content: string): string {
  const lines = content.split("\n");
  const output: string[] = [];
  let inList = false;
  let inOrderedList = false;
  let inTable = false;
  let tableHeader = false;
  let inBlockquote = false;

  const flushList = () => {
    if (inList) { output.push("</ul>"); inList = false; }
    if (inOrderedList) { output.push("</ol>"); inOrderedList = false; }
  };
  const flushTable = () => { if (inTable) { output.push("</tbody></table>"); inTable = false; tableHeader = false; } };
  const flushBlockquote = () => { if (inBlockquote) { output.push("</blockquote>"); inBlockquote = false; } };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();

    // Headings
    if (/^### (.+)$/.test(line)) {
      flushList(); flushTable(); flushBlockquote();
      const text = line.replace(/^### /, "");
      const id = makeId(text);
      output.push(`<h3 id="${id}" class="scroll-mt-24 mt-8 mb-3 text-lg font-bold text-foreground">${parseInline(text)}</h3>`);
      return;
    }
    if (/^## (.+)$/.test(line)) {
      flushList(); flushTable(); flushBlockquote();
      const text = line.replace(/^## /, "");
      const id = makeId(text);
      output.push(`<h2 id="${id}" class="scroll-mt-24 mt-10 mb-4 text-xl font-extrabold text-foreground border-b border-border pb-2">${parseInline(text)}</h2>`);
      return;
    }
    if (/^# (.+)$/.test(line)) {
      flushList(); flushTable(); flushBlockquote();
      const text = line.replace(/^# /, "");
      output.push(`<h1 class="mt-10 mb-4 text-2xl font-extrabold text-foreground">${parseInline(text)}</h1>`);
      return;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      flushList(); flushTable(); flushBlockquote();
      output.push('<hr class="my-8 border-border" />');
      return;
    }

    // Blockquote
    if (/^> (.+)$/.test(line)) {
      flushList(); flushTable();
      if (!inBlockquote) { output.push('<blockquote class="my-4 border-l-4 border-primary pl-5 text-muted-foreground italic">'); inBlockquote = true; }
      output.push(`<p class="mb-1">${parseInline(line.replace(/^> /, ""))}</p>`);
      return;
    } else if (inBlockquote && line.trim() === "") {
      flushBlockquote();
    }

    // Table
    if (/^\|.+\|$/.test(line)) {
      flushList(); flushBlockquote();
      if (!inTable) {
        output.push('<div class="my-6 overflow-x-auto"><table class="min-w-full border border-border rounded-xl text-sm">');
        inTable = true;
        tableHeader = true;
        const cells = line.split("|").filter(Boolean).map((c) => c.trim());
        output.push(`<thead class="bg-muted"><tr>${cells.map((c) => `<th class="border border-border px-4 py-2 text-left font-semibold text-foreground">${c}</th>`).join("")}</tr></thead><tbody>`);
      } else if (/^[|\s:-]+$/.test(line)) {
        // Skip separator row
        tableHeader = false;
      } else {
        const cells = line.split("|").filter(Boolean).map((c) => c.trim());
        output.push(`<tr class="hover:bg-muted/30">${cells.map((c) => `<td class="border border-border px-4 py-2 text-muted-foreground">${parseInline(c)}</td>`).join("")}</tr>`);
      }
      return;
    } else if (inTable) {
      flushTable();
    }

    // Unordered list
    if (/^[*\-] (.+)$/.test(line)) {
      flushBlockquote(); flushTable();
      if (!inList) { output.push('<ul class="my-4 ml-5 list-disc space-y-1.5 text-muted-foreground">'); inList = true; }
      output.push(`<li>${parseInline(line.replace(/^[*\-] /, ""))}</li>`);
      return;
    } else if (inList && line.trim() === "") {
      flushList();
    }

    // Ordered list
    if (/^\d+\. (.+)$/.test(line)) {
      flushBlockquote(); flushTable();
      if (!inOrderedList) { output.push('<ol class="my-4 ml-5 list-decimal space-y-1.5 text-muted-foreground">'); inOrderedList = true; }
      output.push(`<li>${parseInline(line.replace(/^\d+\. /, ""))}</li>`);
      return;
    } else if (inOrderedList && line.trim() === "") {
      flushList();
    }

    // Blank line
    if (line.trim() === "") {
      return;
    }

    // Regular paragraph
    flushList(); flushTable(); flushBlockquote();
    output.push(`<p class="my-3 leading-relaxed text-muted-foreground">${parseInline(line)}</p>`);
  });

  flushList(); flushTable(); flushBlockquote();
  return output.join("\n");
}

export function ArticleContent({ content, className }: ArticleContentProps) {
  const html = useMemo(() => renderContent(content), [content]);

  return (
    <article
      className={cn("prose-nestiva text-[15px]", className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
      aria-label="Article content"
    />
  );
}
