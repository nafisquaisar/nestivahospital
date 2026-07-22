/**
 * ButtonWrapper
 * ─────────────────────────────────────────────────────────────────────────────
 * Composable button wrapper that can render as a <button>, <a>, or Next.js <Link>.
 * Handles all variants, sizes and states in one place.
 *
 * Built on class-variance-authority for type-safe variant management.
 */

"use client";

import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

// ── Variant Definitions ────────────────────────────────────────────────────

export const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold leading-none tracking-wide",
    "rounded-lg transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 active:scale-[0.98]",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground active:scale-[0.98]",
        ghost:
          "text-foreground bg-transparent hover:bg-muted active:scale-[0.98]",
        danger:
          "bg-danger text-danger-foreground shadow-sm hover:bg-danger/90 active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto",
        white:
          "bg-white text-foreground shadow-md hover:bg-white/90 active:scale-[0.98]",
      },
      size: {
        xs: "h-7 px-3 text-xs rounded-md",
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ── Component Props ────────────────────────────────────────────────────────

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type AsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

type ButtonWrapperProps = AsButton | AsLink;

// ── Component ─────────────────────────────────────────────────────────────

export function ButtonWrapper({
  children,
  className,
  variant,
  size,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}: ButtonWrapperProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
      ) : null}
      {children}
      {!isLoading && rightIcon && (
        <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </>
  );

  // Render as Next.js Link for internal hrefs
  if ("href" in props && props.href !== undefined) {
    const { href, external, ...rest } = props as AsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        {content}
      </Link>
    );
  }

  // Render as <button>
  const { ...rest } = props as AsButton;
  return (
    <button
      className={classes}
      disabled={isLoading || (rest as AsButton).disabled}
      {...rest}
    >
      {content}
    </button>
  );
}
