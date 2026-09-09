"use client";

import { useEffect, useRef, useState } from "react";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const consent = localStorage.getItem("calcora_cookie_consent");
    if (!consent) {
      window.requestAnimationFrame(() => setShow(true));
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("calcora_cookie_consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("calcora_cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-white p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary mb-1">
              Cookie Consent
            </p>
            <p className="text-xs text-text-secondary">
              We use cookies to serve personalized ads and analyze traffic. By
              clicking &quot;Accept&quot;, you consent to the use of cookies for
              advertising purposes. You can manage your preferences at any time.
              See our{" "}
              <a href="/privacy-policy/" className="underline hover:text-navy">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDecline}
              className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-text-secondary hover:bg-surface transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="rounded-lg bg-green px-4 py-2 text-xs font-medium text-white hover:bg-green-dark transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
