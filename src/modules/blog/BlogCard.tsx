"use client";

/**
 * BlogCard — used in /blog listing page
 */

import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { Blog } from "@/types";

interface BlogCardProps {
  post: Blog;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const isReduced = useReducedMotion();

  return (
    <motion.article
      initial={isReduced ? undefined : { opacity: 0, y: 16 }}
      whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm",
        "transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5",
        featured && "sm:flex-row sm:items-stretch"
      )}
      aria-label={`Blog post: ${post.title}`}
    >
      {/* Cover image */}
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "relative block shrink-0 overflow-hidden",
          featured ? "sm:w-2/5 h-48 sm:h-auto" : "h-48"
        )}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          fill
          sizes={featured ? "(max-width: 640px) 100vw, 40vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://placehold.co/1200x630/0066cc/ffffff?text=${encodeURIComponent(post.category.name)}`;
          }}
        />
        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <Badge
            className="text-xs font-semibold text-white shadow"
            style={{ backgroundColor: post.category.color ?? "hsl(var(--primary))" }}
          >
            {post.category.name}
          </Badge>
        </div>
        {featured && (
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-900">
              Featured
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            {post.views.toLocaleString()}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-display font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2",
          featured ? "text-xl" : "text-base"
        )}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Author + CTA */}
        <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-primary/10">
              <Image
                src={post.author.avatar.src}
                alt={post.author.avatar.alt}
                fill
                className="object-cover"
                sizes="28px"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">{post.author.name}</p>
              <p className="truncate text-xs text-muted-foreground">{post.author.designation}</p>
            </div>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all duration-200"
            aria-label={`Read ${post.title}`}
          >
            Read More <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
