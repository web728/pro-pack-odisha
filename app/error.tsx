"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="section">
      <div className="container">
        <h1>Something went wrong.</h1>
        <p>Please try again, or contact the team on +91 70083 41944.</p>
        <button className="button" onClick={reset}>
          Try again
        </button>
      </div>
    </section>
  );
}
