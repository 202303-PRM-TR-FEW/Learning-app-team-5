import CourseContent from "@/components/course-general-components/(countinue-components)/CourseContent";
import Test1 from "@/components/course-general-components/(countinue-components)/Test1";

function preview({ params }) {
  // Define the 'course' object here with necessary properties
  const course = {
    courseImage: "path/to/image",
    instructorImage: "path/to/instructor/image",
    title: "Course Title",
    instructorName: "Instructor Name",
    category: "Course Category",
    level: "Course Level",
    duration: 120, // Course duration in minutes
    rating: 4.5,
    // Other properties
  };

  return (
    <div className="md:flex">
      <div className="w-full md:w-1/2 lg:w-1/2">
        <Test1 selectedCourse={course} />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 h-screen bg-white rounded-md shadow-lg">
        <CourseContent />
      </div>
    </div>
  );
}

export default preview;
