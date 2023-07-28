'use client';
import CourseDisplayPage from "@/components/course-general-components/CourseDisplayPage";
import { useTranslations } from "next-intl";
function SavedCourses() {
  const t = useTranslations("Courses")
  return (
    <CourseDisplayPage
      pageTitle={t("title-2")}
      navigationPath={"./courses"}
      navigationName={t("title-1")}
    />
  );
}

export default SavedCourses;
