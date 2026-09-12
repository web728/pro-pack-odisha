"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  FileUp,
  HelpCircle,
  Phone,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { Recaptcha } from "./recaptcha";
import { forms, schemaFor } from "@/lib/forms";

export function SubmissionForm({ type }: { type: string }) {
  const config = forms[type];
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    id?: string;
    access?: string;
    statusUrl?: string;
    ok: boolean;
  } | null>(null);

  const key = useRef("");
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    if (result) feedbackRef.current?.focus();
  }, [result]);

  useEffect(() => {
    if (!result?.statusUrl) return;
    const controller = new AbortController();
    const timer = setInterval(async () => {
      try {
        const response = await fetch(result.statusUrl!, {
          signal: controller.signal,
        });
        if (response.ok) {
          const data = await response.json();
          if (data.complete)
            setResult((previous) => ({
              ...previous!,
              message:
                "Your details have been recorded and sent to the organizers.",
              statusUrl: undefined,
              access: data.access,
            }));
        }
      } catch {
        // Keep the saved reference visible during a temporary connection failure.
      }
    }, 10000);
    return () => {
      clearInterval(timer);
      controller.abort();
    };
  }, [result?.statusUrl]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || result?.ok) return;
    const data = new FormData(e.currentTarget);
    const parsed = schemaFor(type).safeParse(
      Object.fromEntries(data.entries()),
    );
    const nextErrors: Record<string, string> = {};
    if (!parsed.success)
      for (const issue of parsed.error.issues)
        nextErrors[String(issue.path[0])] = issue.message;

    for (const field of config.fields.filter((f) => f.type === "file")) {
      const file = data.get(field.name) as File;
      if (field.required && !file?.size)
        nextErrors[field.name] = "Please attach a file.";
      else if (file?.size > 2 * 1024 * 1024)
        nextErrors[field.name] = "The maximum file size is 2 MB.";
      else if (
        file?.size &&
        !(
          field.name === "logo"
            ? ["image/png", "image/jpeg"]
            : ["image/png", "image/jpeg", "application/pdf"]
        ).includes(file.type)
      )
        nextErrors[field.name] =
          field.name === "logo"
            ? "Choose a PNG or JPEG image."
            : "Choose a PDF, PNG or JPEG file.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }

    if (process.env.RECAPTCHA_SITE_KEY && !captchaToken) {
      setResult({
        ok: false,
        message: "Please complete the security check before submitting.",
      });
      return;
    }

    data.set("g-recaptcha-response", captchaToken);
    setPending(true);
    inFlight.current = true;
    setResult(null);

    if (!key.current) key.current = crypto.randomUUID();
    data.set("submissionKey", key.current);

    try {
      const res = await fetch(`/api/forms/${type}`, {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors || {});
        setResult({
          ok: false,
          message:
            json.message ||
            "We could not submit your details. Please try again.",
        });
      } else setResult({ ok: true, ...json });
    } catch {
      setResult({
        ok: false,
        message:
          "Connection interrupted. Please try again; your submission reference will stay the same.",
      });
    } finally {
      inFlight.current = false;
      setPending(false);
      setCaptchaToken("");
      setCaptchaReset((value) => value + 1);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 lg:p-10">
      {/* Top Accent Strip */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />

      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Your details
        </h2>
        <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
          Please fill out the form accurately. Fields marked with an asterisk (
          <span className="text-red-600">*</span>) are mandatory.
        </p>
      </div>

      {/* Result / Feedback Banner */}
      {result && (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          role={result.ok ? "status" : "alert"}
          className={`mb-8 rounded-xl border p-5 transition-all outline-none ${
            result.ok
              ? "border-emerald-200 bg-emerald-50/80 text-emerald-950"
              : "border-red-200 bg-red-50/80 text-red-950"
          }`}
        >
          <div className="flex items-start gap-3">
            {result.ok ? (
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
            ) : (
              <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-600" />
            )}
            <div className="space-y-2 text-xs sm:text-sm">
              <div>
                <strong className="font-semibold">
                  {result.ok ? "Thank you! " : "Submission Error: "}
                </strong>
                <span>{result.message}</span>
              </div>

              {result.id && (
                <div className="inline-flex items-center gap-1.5 rounded-md bg-white/90 px-2.5 py-1 font-mono text-xs font-semibold text-slate-800 shadow-2xs">
                  <span>Reference ID:</span>
                  <span className="text-red-700">{result.id}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-1">
                {result.statusUrl && (
                  <a
                    href={result.statusUrl.replace(
                      "/api/submission-status",
                      "/submission-status",
                    )}
                    className="inline-flex items-center gap-1 font-semibold text-slate-900 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-900"
                  >
                    <span>Check processing status</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}

                {result.access && (
                  <a
                    href={result.access}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold !text-white shadow-xs hover:bg-black"
                  >
                    <span>
                      {type === "brochure"
                        ? "Download archived 2023 brochure"
                        : "Open and save your visitor pass"}
                    </span>
                    <ArrowUpRight size={13} className="!text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submission Form */}
      {!result?.ok && (
        <form ref={formRef} onSubmit={submit} noValidate className="space-y-6">
          {/* Error Summary Alert */}
          {Object.keys(errors).length > 0 && (
            <div
              role="alert"
              className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50/90 p-4 text-xs font-medium text-red-900 sm:text-sm"
            >
              <AlertCircle size={17} className="shrink-0 text-red-600" />
              <span>
                Please check{" "}
                {Object.keys(errors).length === 1
                  ? "the highlighted field"
                  : `the ${Object.keys(errors).length} highlighted fields`}{" "}
                below to continue.
              </span>
            </div>
          )}

          {/* Honeypot Spam Guard */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_check">Leave this blank</label>
            <input
              id="website_check"
              name="website_check"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {config.fields
              .filter((field) => {
                const person = field.name.match(/^person(\d+)/);
                return (
                  type !== "exhibitor-badges" ||
                  !person ||
                  Number(person[1]) <= badgeCount
                );
              })
              .map((field) => {
                const isFullWidth = ["textarea", "file"].includes(
                  field.type || "",
                );
                const hasError = !!errors[field.name];

                return (
                  <div
                    key={field.name}
                    className={`flex flex-col justify-start space-y-1.5 ${
                      isFullWidth ? "sm:col-span-2" : ""
                    }`}
                  >
                    {/* Field Label */}
                    <label
                      htmlFor={field.name}
                      className="flex items-center justify-between text-xs font-semibold text-slate-800 sm:text-sm"
                    >
                      <span>
                        {field.label}
                        {(field.required ||
                          (type === "exhibitor-badges" &&
                            /^person\d/.test(field.name))) && (
                          <span className="text-red-600"> *</span>
                        )}
                      </span>

                      {field.type === "file" && (
                        <span className="text-[11px] font-normal text-slate-400">
                          Max 2 MB
                        </span>
                      )}
                    </label>

                    {/* Field Control Type Routing */}
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        maxLength={4000}
                        rows={4}
                        disabled={pending}
                        aria-invalid={hasError}
                        aria-describedby={`${field.name}-help`}
                        className={`w-full rounded-xl border bg-slate-50/50 p-3.5 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none sm:text-sm ${
                          hasError
                            ? "border-red-400 ring-2 ring-red-400/20"
                            : "border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/15"
                        }`}
                      />
                    ) : field.type === "select" ? (
                      <div className="relative">
                        <select
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          aria-invalid={hasError}
                          aria-describedby={`${field.name}-help`}
                          defaultValue=""
                          disabled={pending}
                          onChange={
                            field.name === "badgeCount"
                              ? (event) => {
                                  setBadgeCount(Number(event.target.value));
                                  setErrors({});
                                }
                              : undefined
                          }
                          className={`w-full appearance-none rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 transition-all focus:bg-white focus:outline-none sm:text-sm ${
                            hasError
                              ? "border-red-400 ring-2 ring-red-400/20"
                              : "border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/15"
                          }`}
                        >
                          <option value="">Select an option</option>
                          {field.options?.map((x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : field.type === "file" ? (
                      <div className="relative flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-4 transition-colors hover:border-red-400">
                        <FileUp size={22} className="text-slate-400 shrink-0" />
                        <div className="flex-1 overflow-hidden">
                          <input
                            id={field.name}
                            name={field.name}
                            type="file"
                            required={field.required}
                            disabled={pending}
                            accept={
                              field.name === "logo"
                                ? "image/png,image/jpeg"
                                : "application/pdf,image/png,image/jpeg"
                            }
                            aria-invalid={hasError}
                            aria-describedby={`${field.name}-help`}
                            className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white hover:file:bg-black"
                          />
                        </div>
                      </div>
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type || "text"}
                        required={
                          field.required ||
                          (type === "exhibitor-badges" &&
                            /^person\d/.test(field.name))
                        }
                        disabled={pending}
                        autoComplete={
                          (
                            {
                              name: "name",
                              email: "email",
                              phone: "tel",
                              company: "organization",
                              country: "country-name",
                              city: "address-level2",
                              postalCode: "postal-code",
                            } as Record<string, string>
                          )[field.name]
                        }
                        min={
                          field.type === "number"
                            ? (field.min ?? 0.01)
                            : undefined
                        }
                        max={field.type === "number" ? field.max : undefined}
                        step={field.type === "number" ? "any" : undefined}
                        maxLength={
                          field.type === "number" ? undefined : field.max || 250
                        }
                        aria-invalid={hasError}
                        aria-describedby={`${field.name}-help`}
                        className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none sm:text-sm ${
                          hasError
                            ? "border-red-400 ring-2 ring-red-400/20"
                            : "border-slate-200 focus:border-red-600 focus:ring-2 focus:ring-red-600/15"
                        }`}
                      />
                    )}

                    {/* Hint & Inline Validation Message */}
                    <div id={`${field.name}-help`} className="space-y-1 pt-0.5">
                      {field.hint && (
                        <p className="text-[11px] text-slate-500">
                          {field.hint}
                        </p>
                      )}
                      {field.words && (
                        <p className="text-[11px] text-slate-400">
                          Maximum {field.words} words.
                        </p>
                      )}
                      {hasError && (
                        <p className="flex items-center gap-1 text-xs font-medium text-red-600">
                          <AlertCircle size={13} className="shrink-0" />
                          <span>{errors[field.name]}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Consent Checkbox */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                value="yes"
                required
                disabled={pending}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                I agree to the processing and use of my contact details to
                fulfill this submission, as described in the{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-slate-900 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-900"
                >
                  privacy policy
                </Link>
                .
              </span>
            </label>

            {errors.consent && (
              <p
                id="consent-error"
                role="alert"
                className="mt-2.5 flex items-center gap-1 text-xs font-medium text-red-600"
              >
                <AlertCircle size={13} className="shrink-0" />
                <span>{errors.consent}</span>
              </p>
            )}
          </div>

          {/* Recaptcha Container */}
          <div className="pt-2">
            <Recaptcha onToken={setCaptchaToken} resetKey={captchaReset} />
          </div>

          {/* Submit Action Area */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              data-cta="submit-enquiry"
              disabled={pending}
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-xs font-bold !text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/40 active:scale-[0.98] disabled:cursor-wait disabled:opacity-75 sm:text-sm"
            >
              <span className="!text-white font-bold tracking-wide">
                {pending ? "Submitting details..." : config.button}
              </span>
              {pending ? (
                <LoaderCircle className="animate-spin !text-white" size={17} />
              ) : (
                <ArrowUpRight
                  size={17}
                  className="!text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              )}
            </button>

            {/* Helpline Assistance Notice */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Phone size={13} className="text-red-600 shrink-0" />
              <span>Need help? Call</span>
              <a
                href="tel:+917008341944"
                className="font-bold text-slate-800 hover:text-red-600 hover:underline"
              >
                +91 70083 41944
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
