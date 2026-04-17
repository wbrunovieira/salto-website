export default function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      {/* Badge */}
      <div className="skeleton h-8 w-72 mb-14 rounded-full" />

      {/* Headline 3 lines */}
      <div className="flex flex-col items-center gap-3 w-full max-w-3xl">
        <div className="skeleton h-16 md:h-20 w-full max-w-2xl" />
        <div className="skeleton h-16 md:h-20 w-full max-w-xl" />
        <div className="skeleton h-16 md:h-20 w-48 md:w-72" style={{ background: "linear-gradient(90deg,#2a1500 25%,#3d2000 50%,#2a1500 75%)", backgroundSize: "600px 100%", animation: "shimmer 1.6s ease-in-out infinite" }} />
      </div>

      {/* Subheadline */}
      <div className="flex flex-col items-center gap-2 mt-14 w-full max-w-lg">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-4/5" />
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-4 mt-12">
        <div className="skeleton h-14 w-52 rounded-full" style={{ background: "linear-gradient(90deg,#2a1500 25%,#3d2000 50%,#2a1500 75%)", backgroundSize: "600px 100%", animation: "shimmer 1.6s ease-in-out infinite" }} />
        <div className="skeleton h-14 w-40 rounded-full" />
      </div>
    </section>
  );
}
