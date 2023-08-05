"use client";
import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import CourseCard from "./CourseCard";
import { Spinner } from "@material-tailwind/react";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import Link from "next/link";
import { useTranslations } from "next-intl";

function CourseList({
  onCourseClick,
  selectedCourse,
  pageTitle,
  navigationPath,
  navigationName,
}) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t =useTranslations("Courses")

  const coursesCollection = collection(db, "course-data");

  useEffect(() => {
    const getCourses = async () => {
      // Read the data
      try {
        const data = await getDocs(coursesCollection);
        // const actualData = data.docs.map((doc) => doc.data());

        const actualData = data.docs.map((doc) => {
          const courseData = doc.data();
          return {
            docID: doc.id,
            ...courseData,
          };
        });

        // Set the courses
        setCourses(actualData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, []);

  const coursesToPull = courses.filter((course) => {
    if (pageTitle === t("title-1")) {
      return course
    } else if (pageTitle === t("title-2")) {
      return course
    } else {
      return console.log("Error: No courses to pull");
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto m-4">
      <div className="flex justify-between items-center m-4 p-4 bg-primaryBlue opacity-80 rounded lg:sticky top-0 z-50">
        <h1 className="text-white dark:text-white md:text-2xl text-xl font-semibold">
          {pageTitle}
        </h1>
        <Link
          href={navigationPath || "./home"}
          className="text-[#efefef] dark:text-white md:text-base text-sm"
        >
          {navigationName || "Navigate to"}
          <NavigateNextOutlinedIcon className="text-white" />
        </Link>
      </div>
      {coursesToPull.map((course) => {
        // if (course.isSaved) {
        const selectedStyle =
          course.id === selectedCourse?.id ? "card-clicked" : "";
        if (course.isRegistered) {
          const randomProgress = Math.floor(Math.random() * 101);
          return (
            <CourseCard
              key={course.id}
              course={course}
              mockProgress={randomProgress}
              onClick={onCourseClick}
              selectedStyle={selectedStyle}
            />
          );
          // }
          return (
            <CourseCard
              key={course.id}
              course={course}
              mockProgress={null}
              onClick={onCourseClick}
              selectedStyle={selectedStyle}
            />
          );
        }
      })}
    </div>
  );
}

export default CourseList;
