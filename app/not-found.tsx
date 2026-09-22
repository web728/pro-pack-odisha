import { PageHero, Button } from "@/components/shared/ui";
export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404 / Page not found"
        title="Let’s get you back on track."
        description="The page you’re looking for may have moved, or the address may be incomplete."
      />
      <section className="section py-16">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Return home</Button>
          <Button secondary href="/exhibitors">
            Exhibitors
          </Button>
          <Button secondary href="/visitors">
            Visitors
          </Button>
          <Button secondary href="/contact-us">
            Contact us
          </Button>
        </div>
      </section>
    </>
  );
}