import { PageHero } from "@/components/shared/ui";
import { PassLookup, PrintPass } from "@/components/pass/pass-view";
import { verifyToken } from "@/lib/tokens";
import { database } from "@/lib/mongodb";
import { event } from "@/lib/site";
import type { Submission } from "@/lib/submissions";
export const metadata = {
  title: "Visitor pass",
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};
export const dynamic = "force-dynamic";
export default async function Pass({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  let doc: Submission | null = null;
  let error = "";
  if (token) {
    const id = verifyToken(token, "pass");
    if (!id)
      error =
        "This pass link is invalid or expired. Please contact the organizers for help.";
    else
      try {
        doc = await (
          await database()
        )
          .collection<Submission>("submissions")
          .findOne({ _id: id, formType: "visitor-registration" });
        if (!doc) error = "No registration was found for this pass.";
      } catch {
        error =
          "Pass lookup is temporarily unavailable. Please try again later.";
      }
  }
  return (
    <>
      <PageHero
        eyebrow="Visitor pass"
        title="Your connection to Propack Odisha."
        description="Keep your registration details ready for your visit."
      />
      {doc ? (
        <article className="pass">
          <p className="eyebrow">PROPACK ODISHA 2027 / VISITOR REGISTRATION</p>
          <h2>{doc.fields.name}</h2>
          <p>
            {doc.fields.designation}
            <br />
            {doc.fields.company}
          </p>
          <hr />
          <p className="mt-6">
            <strong>{event.date}</strong>
            <br />
            {event.venue}
          </p>
          <p>
            Registration reference
            <br />
            <code>{doc._id}</code>
          </p>
          <p className="fine-print">
            Please confirm entry arrangements with the organizers. Keep this
            private link secure.
          </p>
          <PrintPass />
        </article>
      ) : (
        <section className="section">
          <div className="container body-copy">
            {error && (
              <p className="feedback error" role="alert">
                {error}
              </p>
            )}
            <PassLookup />
          </div>
        </section>
      )}
    </>
  );
}
