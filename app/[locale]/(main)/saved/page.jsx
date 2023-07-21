import CourseDisplayPage from "@/components/course-general-components/CourseDisplayPage";

function SavedCourses() {
  return (
    <CourseDisplayPage
      pageTitle={"Saved Courses"}
      navigationPath={"./courses"}
      navigationName={"My Courses"}
    />
  );
}

export default SavedCourses;
