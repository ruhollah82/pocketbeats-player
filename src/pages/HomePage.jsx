import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <section className="space-y-6">
      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
        Routing is configured
      </span>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          React Router is ready in your Vite app
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          This starter uses a clean layout, route pages, and navigation structure that works with
          React 19, Vite 8, and the latest `react-router-dom` 7 release.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/about"
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Visit About Page
        </Link>
        <a
          href="https://reactrouter.com/start/library/installation"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
        >
          React Router Docs
        </a>
      </div>
    </section>
  )
}

export default HomePage
