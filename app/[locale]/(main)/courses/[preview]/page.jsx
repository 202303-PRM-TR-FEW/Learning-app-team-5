"use client";
import { GetAllCourses } from "@/app/context/FetchAllCourses";
import { useState, useEffect } from "react";
import CourseDisplayPage from "@/components/course-general-components/CourseDisplayPage";
import { useTranslations } from "next-intl";
import { UserAuth } from "@/app/context/AuthContext";
import Link from "next/link";

const Continue = ({ params }) => {
  const { Allcourses, AllModules } = GetAllCourses();
  const [selctedCourse, setSelectedCourse] = useState({});
  const [selctedModules, setSelectedModules] = useState({});

  useEffect(() => {
    if (Allcourses.length > 1) {
      const course = Allcourses.find((course) => course.id == params.preview);
      setSelectedCourse(course);
    }
    if (AllModules.length > 1) {
      setSelectedModules(
        AllModules.find((module) => module.moduleID == params.preview)
      );
    }
  }, [Allcourses, AllModules]);

  const t = useTranslations("Courses");
  //  User state

  return (
    <>
      <CourseDisplayPage
        pageTitle={t("title-1")}
        navigationPath={"./saved"}
        navigationName={t("title-2")}
        Course={selctedCourse}
        selctedModules={selctedModules}
      />
    </>
  );
};

export default Continue;
