"use client";
import { useEffect, useRef, useState } from "react";
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
  if (window.grecaptcha?.render) return Promise.resolve();
  if (!loading)
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
  const siteKey = process.env.RECAPTCHA_SITE_KEY;
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
          size: "compact",
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
              setError(
                "Verification expired. Please complete the check again.",
              );
            }
          },
          "error-callback": () => {
            if (active) {
              onToken("");
              setError(
                "Verification could not load. Check your connection and retry.",
              );
            }
          },
        });
      })
      .catch(() => {
        if (active)
          setError(
            "Verification could not load. Check your connection and retry.",
          );
      });
    return () => {
      active = false;
      if (widget !== undefined) {
        try {
          window.grecaptcha?.reset(widget);
        } catch {}
      }
      element?.replaceChildren();
    };
  }, [siteKey, onToken, resetKey, attempt]);
  if (!siteKey)
    return (
      <p className="fine-print">
        Online verification is not available yet. For assistance, call{" "}
        <a href="tel:+917008341944">70083 41944</a>.
      </p>
    );
  return (
    <div className="captcha-control">
      <p className="fine-print">
        Complete the security check before submitting.
      </p>
      <div ref={host} />
      {error && (
        <div role="alert">
          <p className="field-error">{error}</p>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setError("");
              setAttempt((a) => a + 1);
            }}
          >
            Retry verification
          </button>
        </div>
      )}
      <p className="fine-print">
        Google reCAPTCHA helps protect this form.{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Privacy
        </a>{" "}
        ·{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noreferrer"
        >
          Terms
        </a>
      </p>
    </div>
  );
}
