import type { Metadata } from "next";
import { redirect } from "next/navigation";

/**
 * Stable link for the criminal record certificate.
 *
 * To make this page redirect to the real document, do ONE of:
 *   1. Set CRIMINAL_RECORD_URL in the environment (Vercel → Settings →
 *      Environment Variables), then redeploy. No code change needed.
 *   2. Paste the link into DOCUMENT_URL below and push.
 *
 * Until a link is set, the page renders a short "not issued yet" notice.
 */
const DOCUMENT_URL = "";

// Read the env var at request time so the link can be swapped without a rebuild.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Criminal Record Certificate | Ishimwe Clement",
  description: "Criminal record certificate for Ishimwe Clement.",
  robots: { index: false, follow: false },
};

export default function CriminalRecordPage() {
  const url = (process.env.CRIMINAL_RECORD_URL || DOCUMENT_URL).trim();

  if (url) {
    redirect(url);
  }

  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center px-6 py-24"
    >
      <div className="w-full max-w-xl border border-[var(--menu-border)] bg-[var(--menu-bg)] px-8 py-10">
        <p className="font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-widest text-[var(--color-primary)]">
          Document
        </p>

        <h1 className="mt-3 font-[family-name:var(--font-nippo)] text-2xl font-medium sm:text-3xl">
          Criminal Record Certificate
        </h1>

        <p className="mt-6 text-sm leading-relaxed opacity-80 sm:text-base">
          This certificate has been requested and is still being issued by the
          relevant authority. As soon as it is available, this same link will
          take you straight to the document — no need to ask for a new one.
        </p>

        <p className="mt-4 text-sm leading-relaxed opacity-80 sm:text-base">
          If you need it urgently, please reach out and I will share the status
          of the application.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="mailto:clement@ishimwe.dev?subject=Criminal%20Record%20Certificate"
            className="border border-[var(--menu-border)] px-4 py-2 text-sm transition-colors hover:bg-[var(--color-primary)] hover:text-white"
          >
            Contact me
          </a>
          <a
            href="/"
            className="px-4 py-2 text-sm underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
          >
            Back to portfolio
          </a>
        </div>
      </div>
    </main>
  );
}
