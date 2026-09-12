"use client";

import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Database,
  Lock,
  Mail,
  ShieldAlert,
  ExternalLink,
  FileText,
} from "lucide-react";
import { RevealSection } from "@/components/shared/motion";
import { Eyebrow } from "@/components/shared/eyebrow";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerCards: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export function PrivacyContent() {
  return (
    <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-14 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border-b border-[var(--border)] pb-8"
          >
            <div className="flex items-center gap-2">
             
              <Eyebrow>Transparency & Data Integrity</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl">
              Privacy Policy & Handling Practices
            </h1>

            <p className="mt-2 text-sm text-[var(--muted-foreground,#4b5563)] sm:text-base">
              How delegate profiles, exhibitor files, and technical submission records are collected, protected, and managed for Propack Odisha 2027.
            </p>
          </motion.div>

          {/* Policy Cards Grid */}
          <motion.div
            className="mt-10 space-y-6"
            variants={staggerCards}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {/* 1. Information you provide */}
            <motion.article
              variants={fadeUp}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xs sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f8f7] text-[var(--primary)]">
                  <FileText size={20} />
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-2xl">
                  Information you provide
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                Registration, enquiry, and exhibitor service forms collect the
                professional contact details and requirements shown on each form.
                Directory and stall-design forms also collect the files you choose to
                attach.
              </p>
            </motion.article>

            {/* 2. How submissions are handled */}
            <motion.article
              variants={fadeUp}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xs sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f8f7] text-[var(--primary)]">
                  <Database size={20} />
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-2xl">
                  How submissions are handled
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                Information is used to process your request and coordinate your
                participation. Submissions are stored in the application database,
                copied to the organizers’ Google Sheets, and included in notifications
                to the designated organizer recipients. Uploaded files are held
                privately for organizer review.
              </p>
            </motion.article>

            {/* 3. Security and access */}
            <motion.article
              variants={fadeUp}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xs sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f8f7] text-[var(--primary)]">
                  <Lock size={20} />
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-2xl">
                  Security and access
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                The website uses submission references and private access links for
                visitor passes and brochure access. Keep your pass link private.
                Technical rate-limit records use a hashed network identifier to help
                prevent abuse.
              </p>
            </motion.article>

            {/* 4. Form security and Google reCAPTCHA */}
            <motion.article
              variants={fadeUp}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xs sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f8f7] text-[var(--primary)]">
                  <ShieldAlert size={20} />
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-2xl">
                  Form security and Google reCAPTCHA
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                When configured, forms load Google reCAPTCHA v2 to prevent automated
                submissions. Google receives technical information such as your IP
                address and browser signals and may use cookies for this check. The
                response token is verified on the server and is not stored with your
                submission. See{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--primary)] underline decoration-[var(--primary)]/40 underline-offset-4 hover:decoration-[var(--primary)]"
                >
                  Google’s Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--primary)] underline decoration-[var(--primary)]/40 underline-offset-4 hover:decoration-[var(--primary)]"
                >
                  Terms of Service
                </a>
                .
              </p>
            </motion.article>

            {/* 5. External websites */}
            <motion.article
              variants={fadeUp}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xs sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f8f7] text-[var(--primary)]">
                  <ExternalLink size={20} />
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-2xl">
                  External websites
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                Following a link to another website, such as Google Maps, takes you to
                a service with its own privacy practices. No comment system, public
                user accounts or advertising trackers are included in this rebuild.
              </p>
            </motion.article>

            {/* 6. Your requests & Direct Contact Banner */}
            <motion.article
              variants={fadeUp}
              className="rounded-2xl border border-[var(--primary)]/20 bg-gradient-to-br from-white via-white to-[var(--primary)]/5 p-6 shadow-xs sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Mail size={20} />
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-2xl">
                  Your requests & Data Rights
                </h2>
              </div>
              
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                Contact{" "}
                <a
                  className="font-bold text-[var(--primary)] underline decoration-[var(--primary)]/40 underline-offset-4 hover:decoration-[var(--primary)]"
                  href="mailto:info@oasme.org.in"
                >
                  info@oasme.org.in
                </a>{" "}
                to ask about your data or request a correction or deletion. The team
                can explain applicable retention arrangements and verify delegate entries.
              </p>
            </motion.article>
          </motion.div>

        </div>
      </div>
    </RevealSection>
  );
}