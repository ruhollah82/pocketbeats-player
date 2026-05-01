import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson14Page = () => {
  return (
    <LessonLayout
      lessonSlug="14-grid"
      summary="A simple dashboard block shows row and column spans."
    >
      <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
        <div className="rounded-3xl bg-slate-900 p-6 text-white md:col-span-2">col-span-2</div>
        <div className="rounded-3xl bg-sky-200 p-6 text-sky-950">1</div>
        <div className="rounded-3xl bg-cyan-200 p-6 text-cyan-950">2</div>
        <div className="rounded-3xl bg-emerald-200 p-6 text-emerald-950 md:col-span-3">col-span-3</div>
      </div>
    </LessonLayout>
  )
}

export default Lesson14Page
