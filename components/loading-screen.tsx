export function LoadingScreen() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14" aria-busy="true" aria-live="polite">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          Chargement
        </p>
        <div className="h-10 w-full max-w-xl rounded-md bg-navy/70" />
        <div className="mt-4 h-5 w-full max-w-2xl rounded-md bg-navy/60" />
        <div className="relative mt-6 h-1.5 w-full max-w-lg overflow-hidden rounded-full bg-navy/70">
          <span className="loading-sheen absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="glass-border overflow-hidden rounded-lg p-5"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="h-40 rounded-md bg-navy/70 animate-pulse" />
            <div className="mt-5 h-6 w-3/4 rounded-md bg-navy/70 animate-pulse" />
            <div className="mt-3 h-4 w-full rounded-md bg-navy/60 animate-pulse" />
            <div className="mt-2 h-4 w-5/6 rounded-md bg-navy/60 animate-pulse" />
            <div className="mt-5 flex gap-2">
              <span className="h-7 w-20 rounded-md bg-navy/70 animate-pulse" />
              <span className="h-7 w-24 rounded-md bg-navy/70 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
