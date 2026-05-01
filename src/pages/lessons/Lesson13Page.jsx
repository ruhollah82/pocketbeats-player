import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson13Page = () => {
  return (
    <LessonLayout
      lessonSlug="13-flex"
      summary="Alignment and spacing utilities make row layout adjustments fast."
    >
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">flex items-center justify-between</p>
          <h2 className="text-2xl font-bold text-slate-900">Flexible card header</h2>
        </div>
        <button className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">Action</button>
      </div>
    </LessonLayout>
  )
}

export default Lesson13Page
