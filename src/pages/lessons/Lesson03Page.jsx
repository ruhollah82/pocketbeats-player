import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson03Page = () => {
  return (
    <LessonLayout
      lessonSlug="03-container-spacing"
      summary="A centered article stack demonstrates container width, padding, and spacing."
    >
      <div className="rounded-3xl bg-slate-950 px-4 py-8 text-white sm:px-8">
        <div className="mx-auto max-w-2xl space-y-6 rounded-3xl bg-white p-8 text-slate-900">
          <article className="space-y-3">
            <h2 className="text-2xl font-bold">Article One</h2>
            <p className="leading-7 text-slate-600">
              Containers help you keep content readable, while padding and vertical spacing make the
              layout breathe without custom CSS rules.
            </p>
          </article>
        </div>
      </div>
    </LessonLayout>
  )
}

export default Lesson03Page
