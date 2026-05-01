import LessonLayout from "../../components/lessons/LessonLayout";
import img1 from "../../assets/img/img3.jpg";
const Lesson09Page = () => {
  return (
    <LessonLayout
      lessonSlug="09-filters"
      summary="Filter utilities change the feel of the same image block instantly."
    >
      {/* Blur */}
      <div className="blur-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum beatae
        dicta placeat deserunt ullam exercitationem deleniti eum iusto? Labore,
        repudiandae!
      </div>
      <img src={img1} className="brightness-30 " alt="" />
      <img src={img1} className="brightness-50 " alt="" />
      <img src={img1} className="brightness-70 " alt="" />
      <img src={img1} className="brightness-100 " alt="" />
      <img src={img1} className="brightness-130 " alt="" />
      <img src={img1} className="brightness-160 " alt="" />

      <img src={img1} className="brightness-170 " alt="" />

      {/* contrast */}
      <img src={img1} className="contrast-0 " alt="" />
      <img src={img1} className="contrast-10 " alt="" />
      <img src={img1} className="contrast-30 " alt="" />
      <img src={img1} className="contrast-60 " alt="" />
      <img src={img1} className="contrast-70 " alt="" />
      <img src={img1} className="contrast-100 " alt="" />
      <img src={img1} className="contrast-120 " alt="" />
      <img src={img1} className="contrast-130 " alt="" />
      <img src={img1} className="contrast-140 " alt="" />

      <img src={img1} className="contrast-200 " alt="" />
    </LessonLayout>
  );
};

export default Lesson09Page;
