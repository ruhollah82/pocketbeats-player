import LessonLayout from "../../components/lessons/LessonLayout";

const Lesson01Page = () => {
  return (
    <LessonLayout
      lessonSlug="01-utility-first"
      summary="A tiny alert card shows how Tailwind utilities compose a finished component quickly."
    >
      <p className="bg-red-500 ">Dashagh</p>
    </LessonLayout>
  );
};

export default Lesson01Page;
