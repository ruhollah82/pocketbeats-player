import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson08Page = () => {
  return (
    <LessonLayout
      lessonSlug="08-borders"
      summary="See sharp, rounded, and outlined surfaces side by side."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-sm">Default border</div>
        <div className="rounded-2xl border-4 border-sky-400 bg-white p-6 shadow-sm">Rounded border</div>
        <div className="rounded-full bg-white p-6 text-center text-slate-900 outline-4 outline-offset-4 outline-emerald-300 shadow-sm">
          Outline
        </div>
      </div>
    </LessonLayout>
  )
}

export default Lesson08Page
