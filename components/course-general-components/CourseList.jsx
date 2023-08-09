"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Spinner } from "@material-tailwind/react";

import CourseCard from "./CourseCard";
import { GetAllCourses } from "../../app/context/FetchAllCourses";
import { UserAuth } from "@/app/context/AuthContext";
const NavigateNextOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/NavigateNextOutlined")
);

function CourseList({
  onCourseClick,
  selectedCourse,
  pageTitle,
  navigationPath,
  navigationName,
}) {
  const [courses, setCourses] = useState([]);
  const { Allcourses, isLoading } = GetAllCourses();
  const { user } = UserAuth();
  const t = useTranslations("Courses");

  useEffect(() => {
    const getCourses = () => {
      setCourses(Allcourses);
    };
    getCourses();
  }, [Allcourses]);

  const coursesToPull = courses.filter((course) => {
    if (pageTitle === t("title-1")) {
      return course.isRegistered.includes(user ? user.uid : "");
    } else if (pageTitle === t("title-2")) {
      return course.isSaved.includes(user ? user.uid : "");
    } else if (pageTitle === course.category) {
      return course.category;
    } else {
      return console.log("Error: No courses to pull");
    }
  });

  function capitalizeFirstLetters(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto m-4">
      <div className="flex justify-between items-center m-4 p-4 bg-[#56a0fe] opacity-80 rounded lg:sticky top-0 z-50">
        <h1 className="text-white md:text-2xl text-xl font-semibold">
          {capitalizeFirstLetters(pageTitle)}
        </h1>
        <Link
          href={navigationPath || "./home"}
          className="text-[#efefef] dark:text-white md:text-base text-sm"
        >
          {navigationName || "Navigate to"}
          <NavigateNextOutlinedIcon className="text-white" />
        </Link>
      </div>
      {coursesToPull.length !== 0 ? (
        coursesToPull.map((course) => {
          const selectedStyle =
            course.id === selectedCourse?.id ? "card-clicked" : "";
          const randomProgress = Math.floor(Math.random() * 101);
          return (
            <CourseCard
              key={course.id}
              course={course}
              mockProgress={course.isRegistered ? randomProgress : null}
              onClick={onCourseClick}
              selectedStyle={selectedStyle}
            />
          );
        })
      ) : (
        <div className="h-full flex justify-center items-center text-center text-lg">
          <div className="bg-white dark:bg-indigoDay mx-auto w-[80%] rounded-2xl flex flex-col gap-3">
            <span className="text-primaryBlue font-bold text-2xl py-6">
              Oops !!!{" "}
            </span>
            <p>{t("Message-3")} </p>
            <Link href="/search" className="pb-6 pt-4">
              <button className="bg-primaryBlue rounded-xl py-2 px-4 ">
                {t("Button-5")}
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseList;
