"use client";
import React from "react";
import { useState } from "react";
import CourseList from "./CourseList";
import CourseOverview from "./CourseOverview";

function CourseDisplayPage({ pageTitle, navigationPath, navigationName }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  function handleCourseClick(course) {
    setSelectedCourse(course);
  }

  return (
    <div className="flex w-full justify-end">
      <div className="container m-2 flex flex-col min-h-screen gap-2 lg:max-w-[1280px] lg:grid lg:grid-cols-2 lg:mx-auto">
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
