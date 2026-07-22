"use client";

/**
 * BlogListContent — client component for blog listing page with search + category filter
 */

import { useState, useMemo, useCallback } from "react";
import { Search, Rss } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./BlogCard";
import { cn } from "@/utils";
import type { Blog } from "@/types";

const PAGE_SIZE = 6;

interface Category {
  id: string;
  slug: string;
  name: string;
  color?: string;
  count: number;
}

interface BlogListContentProps {
  posts: Blog[];
  featured: Blog[];
  categories: Category[];
}

export function BlogListContent({ posts, featured, categories }: BlogListContentProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== "all") {
      result = result.filter((b) => b.category.slug === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.author.name.toLowerCase().includes(q) ||
          b.tags.some((t) => t.name.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, search, activeCategory]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(0, page * PAGE_SIZE);

  const handleCategoryChange = useCallback((slug: string) => {
    setActiveCategory(slug);
    setPage(1);
  }, []);

  const handleSearch = useCallback((q: string) => {
    setSearch(q);
    setPage(1);
  }, []);

  return (
    <div className="flex flex-col gap-12">
      {/* ── Search + Category filter ──────────────────────────── */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Search articles, topics, or authors…"
            className="pl-10 h-11"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search blog articles"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category filter">
          <button
            onClick={() => handleCategoryChange("all")}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200",
              activeCategory === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
            aria-pressed={activeCategory === "all"}
          >
            All Articles ({posts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                activeCategory === cat.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
              aria-pressed={activeCategory === cat.slug}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured articles (only when no filter active) ────── */}
      {!search && activeCategory === "all" && featured.length > 0 && (
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="font-display text-xl font-extrabold text-foreground mb-5 flex items-center gap-2">
            <Rss className="h-5 w-5 text-primary" aria-hidden="true" />
            Featured Articles
          </h2>
          <div className="flex flex-col gap-5">
            {featured.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} featured />
            ))}
          </div>
        </section>
      )}

      {/* ── All / filtered articles ───────────────────────────── */}
      <section aria-labelledby="articles-heading">
        <h2 id="articles-heading" className="font-display text-xl font-extrabold text-foreground mb-5">
          {search || activeCategory !== "all" ? `Results (${filtered.length})` : "Latest Articles"}
        </h2>

        {paged.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <Search className="h-10 w-10 text-muted-foreground/40" aria-hidden="true" />
            <p className="text-base font-semibold text-foreground">No articles found</p>
            <p className="text-sm text-muted-foreground">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {page < totalPages && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" onClick={() => setPage((p) => p + 1)} className="gap-2 px-8">
              Load More Articles
            </Button>
          </div>
        )}
      </section>

      {/* ── Newsletter ────────────────────────────────────────── */}
      <section
        className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-white"
        aria-labelledby="newsletter-heading"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="newsletter-heading" className="font-display text-xl font-extrabold mb-1">
              Health Insights Newsletter
            </h2>
            <p className="text-sm text-white/80">
              Evidence-based health articles from our specialists, delivered monthly.
            </p>
          </div>
          <form
            className="flex gap-2 shrink-0"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter subscription"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              className="bg-white/15 border-white/25 placeholder:text-white/60 text-white w-48 focus-visible:ring-white/30"
              aria-label="Email address for newsletter"
            />
            <Button type="submit" variant="secondary" className="bg-white text-primary hover:bg-white/90 shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
