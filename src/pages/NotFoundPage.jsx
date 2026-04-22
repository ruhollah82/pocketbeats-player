import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className="space-y-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">404</p>
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="text-slate-600">The page you requested does not exist.</p>
      <Link
        to="/"
        className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Go back home
      </Link>
    </section>
  )
}

export default NotFoundPage
