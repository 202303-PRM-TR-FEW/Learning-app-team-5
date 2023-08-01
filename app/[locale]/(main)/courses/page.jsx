'use client';
import CourseDisplayPage from "@/components/course-general-components/CourseDisplayPage";
import { useTranslations } from "next-intl";

function MyCourses() {
  const t = useTranslations("Courses")
  
  return (
    <CourseDisplayPage
      pageTitle={t("title-1")}
      navigationPath={"./saved"}
      navigationName={t("title-2")}
    />
  );
}

export default MyCourses;
