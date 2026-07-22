"use client";

/**
 * BlogSection
 * ─────────────────────────────────────────────────────────────────────────────
 * 3-column blog card grid for the homepage.
 * Shows 3 featured posts with cover image, category badge, reading time,
 * title, excerpt, author avatar, and "Read Article" CTA.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Container } from "@/components/shared/Container";
import { blogs } from "@/data/blogs";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  imageZoom,
  defaultViewport,
  lazyViewport,
  animationProps,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";

function BlogCard({ post, index }: { post: (typeof blogs)[0]; index: number }) {
  const isReduced = useReducedMotion();

  return (
    <motion.article
      {...animationProps(isReduced, { variants: staggerItem })}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card",
        "shadow-sm transition-shadow duration-300 hover:shadow-xl"
      )}
      aria-label={`Blog post: ${post.title}`}
    >
      {/* Cover image */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative block h-48 shrink-0 overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <motion.div
          className="relative h-full w-full"
          whileHover={isReduced ? undefined : imageZoom}
        >
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            className="object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://placehold.co/1200x630/0066cc/ffffff?text=${encodeURIComponent(post.category.name)}`;
            }}
          />
        </motion.div>
        {/* Category badge overlay */}
        <div className="absolute left-3 top-3">
          <Badge
            className="text-xs font-semibold text-white shadow"
            style={{ backgroundColor: post.category.color ?? "hsl(var(--primary))" }}
          >
            {post.category.name}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            {post.views.toLocaleString()} views
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Author + CTA */}
        <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-primary/10">
              <Image
                src={post.author.avatar.src}
                alt={post.author.avatar.alt}
                fill
                className="object-cover"
                sizes="32px"
                onError={(e) => {
                  const initials = post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2);
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector(".fallback-initials")) {
                    const span = document.createElement("span");
                    span.className =
                      "fallback-initials absolute inset-0 flex items-center justify-center text-xs font-bold text-primary";
                    span.textContent = initials;
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">
                {post.author.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {post.author.designation}
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="shrink-0 gap-1 text-primary hover:text-primary/80 px-0"
          >
            <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
              Read
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export function BlogSection() {
  const isReduced = useReducedMotion();

  return (
    <section
      id="blog"
      className="bg-muted/20 py-16 md:py-24"
      aria-labelledby="blog-heading"
    >
      <Container className="flex flex-col gap-12">
        {/* Header */}
        <motion.div
          {...animationProps(isReduced, {
            variants: fadeUp,
            viewport: defaultViewport,
          })}
        >
          <SectionHeader
            eyebrow="Health Insights"
            title="Latest from Our Experts"
            titleId="blog-heading"
            subtitle="Evidence-based articles written by our specialist physicians to help you make informed decisions about your health and wellbeing."
            align="left"
            action={
              <Button asChild variant="outline" className="gap-2 shrink-0">
                <Link href="/blog">
                  All Articles
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            }
          />
        </motion.div>

        {/* Blog grid */}
        <motion.div
          {...animationProps(isReduced, {
            variants: staggerContainer(0.1, 0.1),
            viewport: lazyViewport,
          })}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {blogs.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
