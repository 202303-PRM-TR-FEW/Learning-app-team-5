import CourseContent from "@/components/course-general-components/(countinue-components)/CourseContent";

function preview({ params }) {
  return (
    <div className="md:flex">
      <div className="w-full md:w-1/2 lg:w-1/2 bg-gray-200">
        This div is shown on mid and large screens
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 h-screen bg-white">
        <CourseContent />
      </div>
    </div>
  );
}

export default preview;
