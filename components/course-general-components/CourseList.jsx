"use client";
import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import CourseCard from "./CourseCard";
import { Spinner } from "@material-tailwind/react";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import Link from "next/link";
import { GetAllCourses } from "../../app/context/FetchAllCourses";

function CourseList({
  onCourseClick,
  selectedCourse,
  pageTitle,
  navigationPath,
  navigationName,
}) {
  const [courses, setCourses] = useState([]);
  const { Allcourses, isLoading } = GetAllCourses();

  useEffect(() => {
    const getCourses = () => { 
      setCourses(Allcourses);
    };
    getCourses();
  }, [Allcourses]);

  const coursesToPull = courses.filter((course) => {
    if (pageTitle === "My Courses") {
      return course.isRegistered;
    } else if (pageTitle === "Saved Courses") {
      return course.isSaved;
    } else if (pageTitle === course.category) {
      return course.category;
    }
     else {
      return console.log("Error: No courses to pull");
    }
  });

  function capitalizeFirstLetters(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
          className="text-[#efefef] md:text-base text-sm"
        >
          {navigationName || "Navigate to"}
          <NavigateNextOutlinedIcon className="text-white" />
        </Link>
      </div>
      {coursesToPull.map((course) => {
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
      })}
    </div>
  );
}

export default CourseList;
