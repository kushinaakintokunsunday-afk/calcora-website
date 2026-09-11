"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initAnalyticsIfConsented,
  trackPageView,
} from "@/lib/analytics";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    initAnalyticsIfConsented();
    const id = window.setTimeout(() => trackPageView(pathname), 400);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}