import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson12Page = () => {
  return (
    <LessonLayout
      lessonSlug="12-columns"
      summary="Multi-column text flow works well for dense content samples."
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="columns-1 gap-8 text-slate-600 md:columns-2">
          <p>Tailwind column utilities let longer text flow naturally across columns.</p>
          <p>They work well for article previews, image mosaics, and dense text samples.</p>
        </div>
      </div>
    </LessonLayout>
  )
}

export default Lesson12Page
