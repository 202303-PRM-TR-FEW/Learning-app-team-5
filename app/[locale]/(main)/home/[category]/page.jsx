import CourseDisplayPage from "@/components/course-general-components/CourseDisplayPage";

const page = ({ params }) => {
  return (
    <div className="min-h-screen">
      <CourseDisplayPage
        pageTitle={params.category}
        navigationPath={"./"}
        navigationName={"Home"}
      />
    </div>
  );
};

export default page;
