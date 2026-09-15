"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ticket,
  KeyRound,
  ArrowRight,
  AlertCircle,
  ClipboardPaste,
  Printer,
  ShieldCheck,
} from "lucide-react";

export function PassLookup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputValue(text);
        setError("");
      }
    } catch {
      // Clipboard permission denied or unsupported
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const value = inputValue.trim();
    if (!value) {
      setError("Please enter your private pass link.");
      return;
    }

    try {
      const url = new URL(value, window.location.origin);
      const token = url.searchParams.get("token");

      if (!token || !url.pathname.includes("view-pass")) {
        throw new Error();
      }

      setLoading(true);
      router.push(`/view-pass?token=${encodeURIComponent(token)}`);
    } catch {
      setError(
        "Invalid format. Paste the complete private pass link shown after your registration (e.g. /view-pass?token=...)."
      );
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all sm:p-8"
      >
        {/* Subtle decorative top bar */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />

        {/* Form Header */}
        <div className="flex items-start gap-3.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
            <Ticket size={22} />
          </span>
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Open your visitor pass
            </h2>
         <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
  Paste the private pass link you saved after registration. If you
  have misplaced it, reach out to the OASME team with your
  submission reference.
</p>
          </div>
        </div>

        {/* Input Field Area */}
        <div className="mt-6 space-y-2">
          <label
            htmlFor="pass-link"
            className="flex items-center justify-between text-xs font-semibold text-slate-800 sm:text-sm"
          >
            <span className="flex items-center gap-1.5">
              <KeyRound size={14} className="text-slate-400" />
              Private Pass Link / URL
            </span>

            {/* Paste from clipboard helper button */}
            <button
              type="button"
              onClick={handlePasteClipboard}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-red-600 hover:text-red-700 hover:underline"
            >
              <ClipboardPaste size={12} />
              <span>Paste from clipboard</span>
            </button>
          </label>

          <div className="relative">
            <input
              id="pass-link"
              name="link"
              type="text"
              required
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (error) setError("");
              }}
              placeholder="https://propackodisha.com/view-pass?token=..."
              className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none sm:text-sm ${
                error
                  ? "border-red-400 ring-2 ring-red-400/20"
                  : "border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/15"
              }`}
            />
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-900"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-600" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Security / Privacy Trust Badge */}
        <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
          <span>Encrypted token access · Verified delegate verification</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs font-bold !text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:text-sm"
        >
          <span>{loading ? "Verifying token..." : "View Visitor Pass"}</span>
          <ArrowRight
            size={16}
            className={`!text-white transition-transform duration-200 ${
              loading ? "animate-pulse" : "group-hover:translate-x-0.5"
            }`}
          />
        </button>
      </form>
    </div>
  );
}

export function PrintPass() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold !text-white shadow-sm transition-all duration-200 hover:bg-black hover:shadow-md active:scale-95 sm:px-6 sm:py-3 sm:text-sm print:hidden"
    >
      <Printer
        size={16}
        className="!text-white transition-transform duration-200 group-hover:-translate-y-0.5"
      />
      <span className="!text-white font-bold tracking-wide">
        Print / Save as PDF
      </span>
    </button>
  );
}