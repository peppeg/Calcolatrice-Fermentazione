export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16 text-stone-950">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
          Phase 1 baseline
        </span>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Calcolatrice Lievitazione</h1>
          <p className="max-w-2xl text-sm leading-6 text-stone-600">
            Questo placeholder conferma che il baseline Next.js, TypeScript e Tailwind e operativo.
            Le funzionalita del calcolatore arriveranno nelle fasi successive del roadmap GSD.
          </p>
        </div>
        <ul className="grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
          <li className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            App Router root shell
          </li>
          <li className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            TypeScript strict baseline
          </li>
          <li className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            Tailwind CSS v4 entrypoint
          </li>
          <li className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            Repo pronto per quality tooling
          </li>
        </ul>
      </div>
    </main>
  );
}
