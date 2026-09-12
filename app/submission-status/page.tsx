import { PageHero, Button } from "@/components/shared/ui";
import { verifyToken } from "@/lib/tokens";
import { database } from "@/lib/mongodb";
import { submissionAccess, type Submission } from "@/lib/submissions";
export const metadata = {
  title: "Submission status",
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};
export const dynamic = "force-dynamic";
export default async function Status({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const id = verifyToken(token || "", "status");
  let doc: Submission | null = null;
  let message = "This status link is invalid or expired.";
  if (id) {
    try {
      doc = await (
        await database()
      )
        .collection<Submission>("submissions")
        .findOne({ _id: id });
      message = doc?.deliveryComplete
        ? "Your details have been recorded and sent to both organizer recipients."
        : "Your request is saved and notifications are processing. Please check this page again later. There is no need to resubmit.";
      if (!doc) message = "No submission was found.";
    } catch {
      message = "Status is temporarily unavailable. Please try again later.";
    }
  }
  const access = doc?.deliveryComplete
    ? submissionAccess(doc._id, doc.formType)
    : undefined;
  return (
    <>
      <PageHero
        eyebrow="Submission status"
        title="Keep track of your request."
        description={message}
      />
      <section className="section">
        <div className="container">
          {doc && <p>Reference: {doc._id}</p>}
          {access && (
            <Button href={access}>
              {doc?.formType === "brochure"
                ? "Download 2023 archived brochure"
                : "View your visitor pass"}
            </Button>
          )}
          <p className="mt-6">For assistance, call +91 70083 41944.</p>
        </div>
      </section>
    </>
  );
}
