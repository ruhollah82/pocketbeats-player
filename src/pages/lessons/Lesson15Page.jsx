import LessonLayout from "../../components/lessons/LessonLayout";

const Lesson15Page = () => {
  return (
    <LessonLayout
      lessonSlug="15-transform-transition"
      summary="Transforms and transitions combine for satisfying hover feedback."
    >
      <button className="m-2 p-4 bg-blue-700 text-white rounded-xl hover:bg-blue-500 cursor-pointer active:bg-blue-950">
        Click me
      </button>
    </LessonLayout>
  );
};

export default Lesson15Page;
