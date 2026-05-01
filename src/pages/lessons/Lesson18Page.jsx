import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson18Page = () => {
  return (
    <LessonLayout
      lessonSlug="18-dark-mode"
      summary="A static dark preview demonstrates theme-specific utility classes."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="rounded-[1.4rem] bg-slate-950 p-8 text-white">
          <h2 className="text-3xl font-bold">Dark mode utilities in action</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            When you are ready, you can add a theme toggle to this lesson without touching the rest
            of the course pages.
          </p>
        </div>
      </div>
    </LessonLayout>
  )
}

export default Lesson18Page
