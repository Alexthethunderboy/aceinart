"use client";

import { cn } from "@/lib/utils";

interface GeometricSkeletonProps {
  className?: string;
  variant?: "circle" | "rectangle" | "pill";
}

export function GeometricSkeleton({ className, variant = "rectangle" }: GeometricSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/5 border border-white/5 overflow-hidden relative backdrop-blur-sm",
        variant === "circle" && "rounded-full",
        variant === "pill" && "rounded-full",
        variant === "rectangle" && "rounded-lg",
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
