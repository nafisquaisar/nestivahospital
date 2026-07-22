"use client";

/**
 * ShareButtons — social share + copy-link buttons for blog articles
 */

import { useState } from "react";
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encoded = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
  };

  const SHARES = [
    {
      label: "Share on Twitter / X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.title}`,
      color: "hover:text-sky-500",
    },
    {
      label: "Share on Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`,
      color: "hover:text-blue-600",
    },
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`,
      color: "hover:text-blue-700",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)} aria-label="Share article">
      <span className="text-xs font-semibold text-muted-foreground mr-1">Share:</span>

      {SHARES.map(({ label, icon: Icon, href, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all duration-200",
            "hover:border-transparent hover:bg-muted",
            color
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ))}

      <button
        onClick={handleCopy}
        aria-label={copied ? "Link copied!" : "Copy link"}
        className={cn(
          "flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium transition-all duration-200",
          "text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
        )}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}
