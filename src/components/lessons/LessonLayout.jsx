import { Link } from 'react-router-dom'
import { lessons, lessonsBySlug } from '../../data/lessons'

const LessonLayout = ({ lessonSlug, summary, children }) => {
  const lesson = lessonsBySlug[lessonSlug]
  const currentIndex = lessons.findIndex((item) => item.slug === lessonSlug)
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  if (!lesson) {
    return null
  }

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <Link
          to="/"
          className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Back to all lessons
        </Link>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
            Lesson {lesson.id}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {lesson.title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{summary}</p>
        </div>
      </div>

      {children}

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {previousLesson ? (
            <Link
              to={previousLesson.path}
              className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Previous: {previousLesson.title}
            </Link>
          ) : (
            <span className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-400">
              First lesson
            </span>
          )}
        </div>
        <div>
          {nextLesson ? (
            <Link
              to={nextLesson.path}
              className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Next: {nextLesson.title}
            </Link>
          ) : (
            <span className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-400">
              Last lesson
            </span>
          )}
        </div>
      </div>
    </section>
  )
}

export default LessonLayout
