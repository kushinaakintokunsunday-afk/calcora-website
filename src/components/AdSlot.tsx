"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface AdSlotProps {
  slotId: string;
  label?: string;
  className?: string;
  sticky?: boolean;
}

export function AdSlot({ slotId, label = "Advertisement", className = "", sticky = false }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${sticky ? "hidden lg:block lg:sticky lg:top-20" : ""} ${className}`}
      data-ad-slot={slotId}
    >
      {label && (
        <p className="text-xs text-text-muted text-center mb-1 tracking-wide uppercase">
          {label}
        </p>
      )}
      <div className="rounded-lg border border-border bg-surface flex items-center justify-center min-h-[250px] text-text-muted text-sm">
        {isVisible ? (
          <span>Ad placeholder — {slotId}</span>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}

export function AffiliateSpot({ children }: { children?: ReactNode }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-green/30 bg-green/5 p-6 text-center">
      {children ?? (
        <p className="text-sm text-text-muted">
          Compare offers from our trusted partners — coming soon.
        </p>
      )}
    </div>
  );
}
