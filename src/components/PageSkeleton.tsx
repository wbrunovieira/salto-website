const SHIMMER_ORANGE = {
  background: "linear-gradient(90deg,#2a1500 25%,#3d2000 50%,#2a1500 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.6s ease-in-out infinite",
  borderRadius: 8,
} as const;

const INNER = { background: "#252525", borderRadius: 6 } as const;

/* ── Hero ──────────────────────────────────────────────────────────── */
function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="skeleton h-8 w-72 mb-14 rounded-full" />
      <div className="flex flex-col items-center gap-3 w-full max-w-3xl">
        <div className="skeleton h-16 md:h-20 w-full max-w-2xl rounded-lg" />
        <div className="skeleton h-16 md:h-20 w-full max-w-xl rounded-lg" />
        <div className="h-16 md:h-20 w-48 md:w-72 rounded-lg" style={SHIMMER_ORANGE} />
      </div>
      <div className="flex flex-col items-center gap-2 mt-14 w-full max-w-lg">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
      </div>
      <div className="flex items-center gap-4 mt-12">
        <div className="h-14 w-52 rounded-full" style={SHIMMER_ORANGE} />
        <div className="skeleton h-14 w-40 rounded-full" />
      </div>
    </section>
  );
}

/* ── Services ──────────────────────────────────────────────────────── */
function ServicesSkeleton() {
  return (
    <section className="relative bg-[#0E0E0E] px-6 pb-32 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="skeleton h-8 w-40 rounded-full mb-8" />
          <div className="skeleton h-14 w-full max-w-lg rounded-lg mb-3" />
          <div className="h-14 w-full max-w-sm rounded-lg mb-10" style={SHIMMER_ORANGE} />
          <div className="skeleton h-4 w-full max-w-xl rounded mb-2" />
          <div className="skeleton h-4 w-3/4 max-w-md rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton rounded-2xl p-7 h-48 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl" style={INNER} />
              <div className="h-5 w-3/4 rounded" style={INNER} />
              <div className="h-3 w-full rounded" style={INNER} />
              <div className="h-3 w-2/3 rounded" style={INNER} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Process ───────────────────────────────────────────────────────── */
function ProcessSkeleton() {
  return (
    <section className="relative bg-[#141414] px-6 pb-32 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="skeleton h-8 w-40 rounded-full mb-8" />
          <div className="skeleton h-14 w-full max-w-md rounded-lg mb-3" />
          <div className="h-14 w-full max-w-xs rounded-lg" style={SHIMMER_ORANGE} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton rounded-2xl p-7 flex flex-col gap-4" style={{ minHeight: 200 }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl" style={INNER} />
                <div className="h-6 w-6 rounded-full" style={INNER} />
              </div>
              <div className="h-5 w-4/5 rounded mt-2" style={INNER} />
              <div className="h-3 w-full rounded" style={INNER} />
              <div className="h-3 w-3/4 rounded" style={INNER} />
              <div className="h-3 w-1/2 rounded" style={INNER} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About ─────────────────────────────────────────────────────────── */
function AboutSkeleton() {
  return (
    <section className="relative bg-[#141414] px-6 pb-32 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="skeleton h-8 w-36 rounded-full mb-8" />
          <div className="skeleton h-14 w-full max-w-sm rounded-lg mb-3" />
          <div className="h-14 w-full max-w-xs rounded-lg" style={SHIMMER_ORANGE} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="skeleton rounded-2xl p-8 h-52" />
            <div className="skeleton rounded-2xl p-8 h-40" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton rounded-2xl p-6 h-32" />
              ))}
            </div>
            <div className="skeleton rounded-2xl p-6 h-24" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ───────────────────────────────────────────────────────── */
function ContactSkeleton() {
  return (
    <section className="relative bg-[#0E0E0E] px-6 pb-32 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="skeleton h-8 w-36 rounded-full mb-8" />
          <div className="skeleton h-14 w-full max-w-sm rounded-lg mb-3" />
          <div className="h-14 w-full max-w-xs rounded-lg" style={SHIMMER_ORANGE} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-5">
            <div className="skeleton h-14 rounded-xl" />
            <div className="skeleton h-14 rounded-xl" />
            <div className="skeleton h-14 rounded-xl" />
            <div className="skeleton h-32 rounded-xl" />
            <div className="h-14 rounded-xl" style={SHIMMER_ORANGE} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="skeleton rounded-2xl p-8 h-36" />
            <div className="skeleton rounded-2xl p-6 h-28" />
            <div className="skeleton rounded-2xl p-6 h-28" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Full page ─────────────────────────────────────────────────────── */
export default function PageSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <ServicesSkeleton />
      <ProcessSkeleton />
      <AboutSkeleton />
      <ContactSkeleton />
    </>
  );
}
