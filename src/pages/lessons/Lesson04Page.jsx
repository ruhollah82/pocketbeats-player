import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson04Page = () => {
  return (
    <LessonLayout
      lessonSlug="04-typography"
      summary="Preview font sizes, weights, alignment, and decoration options."
    >
      <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="font-mono text-sm uppercase tracking-[0.35em] text-slate-500">Font family</p>
        <h2 className="text-4xl font-black tracking-tight text-slate-950">Typography utilities</h2>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Tailwind lets you combine size, weight, line height, alignment, and decoration classes in
          the markup so text styling stays close to the content it affects.
        </p>
      </div>
    </LessonLayout>
  )
}

export default Lesson04Page
