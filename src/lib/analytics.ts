declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type GTMParams = { event: string } & Record<string, unknown>;

function push(data: GTMParams) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

export function trackCalculatorComplete({
  tool,
  inputsSummary,
  resultValue,
  resultUnit,
}: {
  tool: string;
  inputsSummary?: string;
  resultValue?: number;
  resultUnit?: string;
}) {
  push({
    event: "calculator_complete",
    calcora_tool: tool,
    calcora_inputs: inputsSummary ?? "",
    calcora_result: resultValue ?? null,
    calcora_unit: resultUnit ?? "",
  });
}

export function trackAdImpression({
  slotId,
  viewable,
}: {
  slotId: string;
  viewable: boolean;
}) {
  push({
    event: "ad_impression",
    calcora_ad_slot: slotId,
    calcora_ad_viewable: viewable,
  });
}

export function trackAffiliateClick({
  offerId,
  position,
  tool,
}: {
  offerId: string;
  position: "smart-next-step" | "in-content" | "comparison-table";
  tool?: string;
}) {
  push({
    event: "affiliate_click",
    calcora_offer: offerId,
    calcora_position: position,
    calcora_tool: tool ?? "",
  });
}

export function trackScrollDepth() {
  if (typeof window === "undefined") return;
  const maxSeen = { depth: 0 };
  const onScroll = () => {
    const doc = document.documentElement;
    const depth = Math.round(
      (window.scrollY + window.innerHeight) / doc.scrollHeight * 100
    );
    if (depth > maxSeen.depth) {
      maxSeen.depth = depth;
      if ([25, 50, 75, 100].includes(depth)) {
        push({ event: "scroll_depth", calcora_depth: depth });
      }
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

export function initAnalytics(measurementId: string) {
  if (typeof window === "undefined") return;
  const consent = localStorage.getItem("calcora_cookie_consent");
  if (consent !== "accepted") return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.onload = () => {
    push({ event: "gtag_init" });
    const gtag = (window as unknown as { gtag?: unknown }).gtag as
      | ((...args: unknown[]) => void)
      | undefined;
    gtag?.("js", new Date());
    gtag?.("config", measurementId);
  };
  document.head.appendChild(script);
}