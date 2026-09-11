"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT, numericSlotFor } from "@/lib/ads";

interface AdSlotProps {
  slotId: string;
  label?: string;
  className?: string;
  sticky?: boolean;
}

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("calcora_cookie_consent") === "accepted";
  } catch {
    return false;
  }
}

export function AdSlot({ slotId, label = "Advertisement", className = "", sticky = false }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setConsent(hasConsent());
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

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

  useEffect(() => {
    if (!isVisible || consent !== true) return;
    if (document.querySelector("script[data-calcora-adsense]")) return;

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.setAttribute("data-calcora-adsense", "1");
    document.head.appendChild(script);
  }, [isVisible, consent]);

  useEffect(() => {
    if (!isVisible || consent !== true) return;
    if (!numericSlotFor(slotId)) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore ad render errors
    }
  }, [isVisible, consent, slotId]);

  const numeric = numericSlotFor(slotId);
  const showAd = isVisible && consent === true && numeric != null;

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
        {showAd ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: 250 }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={numeric}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <span>
            {isVisible
              ? numeric
                ? "Advertisement"
                : `Ad unit not configured — ${slotId}`
              : "Loading..."}
          </span>
        )}
      </div>
    </div>
  );
}