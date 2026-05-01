import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson17Page = () => {
  return (
    <LessonLayout
      lessonSlug="17-customization"
      summary="This project now uses installed Tailwind instead of the CDN runtime script."
    >
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 shadow-sm">
        <h2 className="text-2xl font-bold">Local Tailwind is active</h2>
        <p className="mt-3 max-w-2xl leading-7">
          Your app imports Tailwind from `src/index.css` and Vite handles it through the installed
          plugin, so this lesson is ready to be customized locally.
        </p>
      </div>
    </LessonLayout>
  )
}

export default Lesson17Page
