/**
 * shadcn/ui — Toast (Radix UI)
 * ─────────────────────────────────────────────────────────────────────────────
 * Lightweight toast built on @radix-ui/react-toast.
 * Supports success and error variants.
 */
"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Provider ──────────────────────────────────────────────────────────────────

const ToastProvider = ToastPrimitives.Provider;

// ── Viewport ──────────────────────────────────────────────────────────────────

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-[9999] flex max-h-screen w-full flex-col gap-2 sm:max-w-[380px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

// ── Toast Variants ────────────────────────────────────────────────────────────

const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start gap-3",
    "overflow-hidden rounded-xl border p-4 shadow-xl shadow-black/10",
    "transition-all duration-300",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
    "data-[state=open]:slide-in-from-bottom-full",
  ],
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground",
        success: "border-emerald-200 bg-emerald-50 text-emerald-900",
        error:   "border-red-200 bg-red-50 text-red-900",
        warning: "border-amber-200 bg-amber-50 text-amber-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ── Toast ─────────────────────────────────────────────────────────────────────

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
));
Toast.displayName = ToastPrimitives.Root.displayName;

// ── Close Button ──────────────────────────────────────────────────────────────

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "ml-auto shrink-0 rounded-md p-1 opacity-60 transition-opacity",
      "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

// ── Title ─────────────────────────────────────────────────────────────────────

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold leading-tight", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

// ── Description ───────────────────────────────────────────────────────────────

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-xs leading-relaxed opacity-80 mt-0.5", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// ── Types ─────────────────────────────────────────────────────────────────────

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastPrimitives.Action>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
