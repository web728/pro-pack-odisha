"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

type CaptchaApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => number;
  reset: (id: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: CaptchaApi;
    propackCaptchaReady?: () => void;
  }
}

let loading: Promise<void> | undefined;

function loadCaptcha() {
  if (typeof window === "undefined") return Promise.reject();
  if (window.grecaptcha?.render) return Promise.resolve();

  if (!loading) {
    loading = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      window.propackCaptchaReady = () => resolve();
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=propackCaptchaReady&render=explicit";
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        script.remove();
        loading = undefined;
        reject(new Error("Challenge unavailable"));
      };
      document.head.appendChild(script);
    });
  }

  return loading;
}

export function Recaptcha({
  onToken,
  resetKey,
}: {
  onToken: (token: string) => void;
  resetKey: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    process.env.RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;

    let active = true;
    let widget: number | undefined;
    const element = host.current;

    onToken("");

    loadCaptcha()
      .then(() => {
        if (!active || !element || !window.grecaptcha) return;

        widget = window.grecaptcha.render(element, {
          sitekey: siteKey,
          size: "normal",
          theme: "light",
          callback: (token: string) => {
            if (active) {
              setError("");
              onToken(token);
            }
          },
          "expired-callback": () => {
            if (active) {
              onToken("");
              setError("Verification expired. Please check the box again.");
            }
          },
          "error-callback": () => {
            if (active) {
              onToken("");
              setError("Verification could not load. Check your connection.");
            }
          },
        });
      })
      .catch(() => {
        if (active) {
          setError("Verification could not load. Check your connection.");
        }
      });

  return () => {
    active = false;
    if (widget !== undefined) {
      try {
        window.grecaptcha?.reset(widget);
      } catch {}
    }
    if (element) {
      element.innerHTML = "";
    }
  };
}, [siteKey, onToken, resetKey, attempt]);

  if (!siteKey) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        reCAPTCHA is not configured. Add{" "}
        <code className="font-mono font-bold">NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code>{" "}
        to your environment variables.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-medium text-slate-500">
        Security Verification <span className="text-[#EB622F]">*</span>
      </p>

      {/* reCAPTCHA widget container */}
      <div className="overflow-x-auto py-1">
        <div ref={host} className="inline-block min-h-[78px]" />
      </div>

      {/* Error alert with retry button */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-[#EB622F]/30 bg-[#EB622F]/10 p-2.5 text-xs text-[#1F3864]"
        >
          <AlertCircle size={14} className="shrink-0 text-[#EB622F]" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => {
              setError("");
              setAttempt((a) => a + 1);
            }}
            className="inline-flex items-center gap-1 font-bold underline hover:text-[#1F3864]"
          >
            <RefreshCw size={12} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Fine-print legal notes */}
      <p className="text-[11px] text-slate-400">
        Protected by Google reCAPTCHA ·{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-600"
        >
          Privacy
        </a>{" "}
        ·{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-600"
        >
          Terms
        </a>
      </p>
    </div>
  );
}