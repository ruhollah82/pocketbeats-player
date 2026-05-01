const AboutPage = () => {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-slate-950">About this conversion</h1>
        <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          The original `tailwind-sandbox-starter` used plain HTML files and the Tailwind CDN script.
          This app now renders the lesson index with React components, uses React Router for lesson
          navigation, and styles everything through the installed local Tailwind package.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Routing fixed</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Exercise links now stay inside the React app instead of pointing to separate HTML files.
          </p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Tailwind localized</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Tailwind is imported in `src/index.css`, so styles are compiled with Vite rather than
            loaded from the CDN at runtime.
          </p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Ready to expand</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            You can now replace each demo card with the full JSX version of the original exercise as
            you continue porting the sandbox.
          </p>
        </article>
      </div>
    </section>
  )
}

export default AboutPage
