import { Link } from 'react-router-dom'
import { lessons } from '../data/lessons'

const HomePage = () => {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
          Converted from the HTML Tailwind sandbox
        </span>
        <div className="space-y-3">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Every course exercise now has its own route
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Open a lesson from here and work on it as a separate React page. This matches the course
            flow much better than putting all exercises into a single screen.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            to={lesson.path}
            className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-sky-700">Lesson {lesson.id}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{lesson.title}</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 transition group-hover:bg-sky-100 group-hover:text-sky-700">
                Open page
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{lesson.description}</p>
            <p className="mt-3 text-xs font-medium text-slate-400">{lesson.path}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HomePage
