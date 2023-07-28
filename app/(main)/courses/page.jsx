import CourseDisplayPage from "@/components/course-general-components/CourseDisplayPage";

function MyCourses() {
  return (
    <CourseDisplayPage
      pageTitle={"marketing"}
      navigationPath={"./saved"}
      navigationName={"Saved Courses"}
    />
  );
}

export default MyCourses;
