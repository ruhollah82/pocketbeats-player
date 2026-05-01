import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson07Page = () => {
  return (
    <LessonLayout
      lessonSlug="07-backgrounds-shadows"
      summary="Layer gradients and shadows for more dimensional cards."
    >
      <div className="rounded-[2rem] bg-linear-to-br from-sky-500 via-cyan-400 to-emerald-400 p-1 shadow-2xl shadow-cyan-500/30">
        <div className="rounded-[1.7rem] bg-slate-950 p-8 text-white">
          <h2 className="text-3xl font-bold">Gradient panel with deep shadow</h2>
        </div>
      </div>
    </LessonLayout>
  )
}

export default Lesson07Page
