import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson05Page = () => {
  return (
    <LessonLayout
      lessonSlug="05-sizing"
      summary="Different width and height utilities visualized as cards."
    >
      <div className="flex flex-wrap items-end gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="w-24 rounded-2xl bg-sky-200 p-4 text-center font-semibold text-sky-950">w-24</div>
        <div className="w-40 rounded-2xl bg-cyan-200 p-4 text-center font-semibold text-cyan-950">w-40</div>
        <div className="h-32 w-32 rounded-2xl bg-emerald-200 p-4 text-center font-semibold text-emerald-950">
          h-32
        </div>
      </div>
    </LessonLayout>
  )
}

export default Lesson05Page
