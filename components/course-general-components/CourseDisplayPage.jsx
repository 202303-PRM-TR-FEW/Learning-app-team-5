"use client";
import React from "react";
import { useState, useEffect } from "react";
import CourseList from "./CourseList";
import CourseOverview from "./CourseOverview";
import useScreenType from "./useScreenType";

function CourseDisplayPage({ pageTitle, navigationPath, navigationName }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const isMobile = useScreenType();

  function handleCourseClick(course) {
    setSelectedCourse(course);
  }

  return (
    <div className="flex w-full justify-end">
      <div
        className={`container flex flex-col gap-2 lg:max-w-[1280px] lg:grid lg:grid-cols-2 lg:mx-auto ${
          isMobile === "mobile" ? "h-screen" : ""
        }`}
      >
        <CourseList
          onCourseClick={handleCourseClick}
          selectedCourse={selectedCourse}
          pageTitle={pageTitle || "Enter Page Title Here"}
          navigationPath={navigationPath || "./home"}
          navigationName={navigationName || "Enter Page Name To Navigate Here"}
        />
        <CourseOverview selectedCourse={selectedCourse} />
      </div>
    </div>
  );
}

export default CourseDisplayPage;
