import LessonLayout from '../../components/lessons/LessonLayout'

const Lesson02Page = () => {
  return (
    <LessonLayout
      lessonSlug="02-colors"
      summary="Sample swatches for text, backgrounds, borders, and accents."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Text', 'text-blue-700', 'Text color sample'],
          ['Background', 'bg-amber-200 text-amber-950', 'Background utility sample'],
          ['Border', 'border-2 border-fuchsia-500', 'Border color sample'],
          ['Accent', 'accent-emerald-500', 'Form accent sample'],
        ].map(([label, className, text]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <div className={`mt-4 rounded-xl p-4 ${className}`}>
              {label === 'Accent' ? (
                <label className="flex items-center gap-3 text-slate-700">
                  <input type="checkbox" defaultChecked className="size-4" />
                  <span>{text}</span>
                </label>
              ) : (
                <p className="font-medium">{text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </LessonLayout>
  )
}

export default Lesson02Page
