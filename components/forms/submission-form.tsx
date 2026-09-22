"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  FileUp,
  Phone,
  Download,
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

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || result?.ok) return;

    const data = new FormData(e.currentTarget);
    const parsed = schemaFor(type).safeParse(
      Object.fromEntries(data.entries()),
    );
    const nextErrors: Record<string, string> = {};

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        nextErrors[String(issue.path[0])] = issue.message;
      }
    }

    // File Validation
    for (const field of config.fields.filter((f) => f.type === "file")) {
      const file = data.get(field.name) as File;
      if (field.required && !file?.size) {
        nextErrors[field.name] = "Please attach a file.";
      } else if (file?.size > 2 * 1024 * 1024) {
        nextErrors[field.name] = "The maximum file size is 2 MB.";
      } else if (
        file?.size &&
        !(
          field.name === "logo"
            ? ["image/png", "image/jpeg"]
            : ["image/png", "image/jpeg", "application/pdf"]
        ).includes(file.type)
      ) {
        nextErrors[field.name] =
          field.name === "logo"
            ? "Choose a PNG or JPEG image."
            : "Choose a PDF, PNG or JPEG file.";
      }
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }

    if (!captchaToken) {
      setResult({
        ok: false,
        message: "Please tick 'I'm not a robot' security checkbox before submitting.",
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
            "We could not submit your details. Please check the fields and try again.",
        });
      } else {
        setResult({ ok: true, message: json.message || "Your details have been successfully recorded." });
      }
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
      {/* Top Accent Strip with Brand Colors */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1F3864] via-[#15A7AE] to-[#EB622F]" />

      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl">
          Your details
        </h2>
        <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
          Please fill out the form accurately. Fields marked with an asterisk (
          <span className="text-[#EB622F] font-bold">*</span>) are mandatory.
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
              : "border-[#EB622F]/30 bg-[#EB622F]/10 text-[#1F3864]"
          }`}
        >
          <div className="flex items-start gap-3">
            {result.ok ? (
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
            ) : (
              <AlertCircle size={20} className="mt-0.5 shrink-0 text-[#EB622F]" />
            )}
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <strong className="font-semibold">
                  {result.ok ? "Thank you! " : "Submission Error: "}
                </strong>
                <span>{result.message}</span>
              </div>

              {result.ok && type === "brochure" && (
                <div className="pt-2">
                  <a
                    href="/downloads/PROPACK EXPO BROCHURE 2027.pdf"
                    download="PROPACK EXPO BROCHURE 2027.pdf"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#EB622F] px-5 py-2.5 text-xs font-bold !text-white shadow-md transition-all hover:bg-[#d55526]"
                  >
                    <Download size={15} className="!text-white" />
                    <span className="!text-white">Download Brochure PDF</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submission Form */}
      {!result?.ok && (
        <form ref={formRef} onSubmit={submit} noValidate className="space-y-6">
          {Object.keys(errors).length > 0 && (
            <div
              role="alert"
              className="flex items-center gap-2.5 rounded-xl border border-[#EB622F]/30 bg-[#EB622F]/10 p-4 text-xs font-medium text-[#1F3864] sm:text-sm"
            >
              <AlertCircle size={17} className="shrink-0 text-[#EB622F]" />
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
                    <label
                      htmlFor={field.name}
                      className="flex items-center justify-between text-xs font-semibold text-[#1F3864] sm:text-sm"
                    >
                      <span>
                        {field.label}
                        {(field.required ||
                          (type === "exhibitor-badges" &&
                            /^person\d/.test(field.name))) && (
                          <span className="text-[#EB622F] font-bold"> *</span>
                        )}
                      </span>
                      {field.type === "file" && (
                        <span className="text-[11px] font-normal text-slate-400">
                          Max 2 MB
                        </span>
                      )}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        maxLength={4000}
                        rows={4}
                        disabled={pending}
                        aria-invalid={hasError}
                        className={`w-full rounded-xl border bg-slate-50/50 p-3.5 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none sm:text-sm ${
                          hasError
                            ? "border-[#EB622F] ring-2 ring-[#EB622F]/20"
                            : "border-slate-200 focus:border-[#EB622F] focus:ring-2 focus:ring-[#EB622F]/15"
                        }`}
                      />
                    ) : field.type === "select" ? (
                      <div className="relative">
                        <select
                          id={field.name}
                          name={field.name}
                          required={field.required}
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
                              ? "border-[#EB622F] ring-2 ring-[#EB622F]/20"
                              : "border-slate-200 focus:border-[#EB622F] focus:ring-2 focus:ring-[#EB622F]/15"
                          }`}
                        >
                          <option value="">Select an option</option>
                          {field.options?.map((x) => (
                            <option key={x} value={x}>
                              {x}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : field.type === "file" ? (
                      <div className="relative flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-4 transition-colors hover:border-[#EB622F]">
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
                            className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#1F3864] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white hover:file:bg-[#162747]"
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
                        className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none sm:text-sm ${
                          hasError
                            ? "border-[#EB622F] ring-2 ring-[#EB622F]/20"
                            : "border-slate-200 focus:border-[#EB622F] focus:ring-2 focus:ring-[#EB622F]/15"
                        }`}
                      />
                    )}

                    {hasError && (
                      <p className="flex items-center gap-1 text-xs font-medium text-[#EB622F]">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors[field.name]}</span>
                      </p>
                    )}
                  </div>
                );
              })}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                value="yes"
                required
                disabled={pending}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#EB622F] focus:ring-[#EB622F]"
              />
              <span className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                I agree to the processing and use of my contact details to
                fulfill this submission, as described in the{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-[#1F3864] underline decoration-slate-400 underline-offset-4 hover:decoration-[#1F3864]"
                >
                  privacy policy
                </Link>
                .
              </span>
            </label>
          </div>

          <div className="pt-2">
            <Recaptcha onToken={setCaptchaToken} resetKey={captchaReset} />
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              data-cta="submit-enquiry"
              disabled={pending}
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#EB622F] px-7 py-3.5 text-xs font-bold !text-white shadow-md transition-all duration-200 hover:bg-[#d55526] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#EB622F]/40 active:scale-[0.98] disabled:cursor-wait disabled:opacity-75 sm:text-sm"
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

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Phone size={13} className="text-[#15A7AE] shrink-0" />
              <span>Need help? Call</span>
              <a
                href="tel:+917751809433"
                className="font-bold text-[#1F3864] hover:text-[#EB622F] hover:underline"
              >
                +91 77518 09433
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}