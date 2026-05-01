import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson06Page = () => {
  return (
    <LessonLayout
      lessonSlug="06-layout-position"
      summary="Relative and absolute positioning shown in a simple mock card."
    >
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
          absolute
        </div>
        <div className="rounded-2xl bg-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900">Layout positioning demo</h2>
        </div>
      </div>
    </LessonLayout>
  )
}

export default Lesson06Page
