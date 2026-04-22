const AboutPage = () => {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">About this structure</h1>
      <p className="max-w-2xl text-base leading-7 text-slate-600">
        Routes live in `src/pages`, shared shells live in `src/layouts`, and router setup lives in
        `src/app/router.jsx`. This keeps the app easy to scale as more pages and nested routes are
        added.
      </p>
    </section>
  )
}

export default AboutPage
