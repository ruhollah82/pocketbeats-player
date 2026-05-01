import LessonLayout from "../../components/lessons/LessonLayout";

const Lesson10Page = () => {
  return (
    <LessonLayout
      lessonSlug="10-interactivity"
      summary="Hover, focus, and cursor states all stay in JSX with the element."
    >
      <button className="bg-black p-2 text-white rounded hover:bg-red-600 mx-4">
        Press
      </button>
      <button className="bg-black p-2 text-white rounded focus:bg-orange-600 mx-4">
        Press
      </button>{" "}
      <button className="bg-black p-2 text-white rounded active:bg-cyan-600 mx-4">
        Press
      </button>
      {/* based on parent state */}
      <a href="" className="group block mx-4 my-2 p-2 bg-cyan-500 max-w-xs">
        <h3 className="group-hover:text-white">Header</h3>
        <p className="group-hover:text-white">text</p>
      </a>
    </LessonLayout>
  );
};

export default Lesson10Page;
