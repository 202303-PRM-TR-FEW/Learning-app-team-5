"use client";
import React from "react";
import { useState } from "react";
import CourseList from "./CourseList";
import CourseOverview from "./CourseOverview";
import useScreenType from "./useScreenType";
import CourseContantOverview from "./CourseContantOverview";
import CourseContent from "./(countinue-components)/CourseContent";

function CourseDisplayPage({
  pageTitle,
  navigationPath,
  navigationName,
  Course,
  selctedModules,
}) {
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
        {!Course && (
          <>
            <CourseList
              onCourseClick={handleCourseClick}
              selectedCourse={selectedCourse}
              pageTitle={pageTitle || "Enter Page Title Here"}
              navigationPath={navigationPath || "./home"}
              navigationName={
                navigationName || "Enter Page Name To Navigate Here"
              }
            />
            <CourseOverview selectedCourse={selectedCourse} />
          </>
        )}
        {Course && <CourseContantOverview Course={Course} />}
        {Course && <CourseContent selctedModules={selctedModules} />}
      </div>
    </div>
  );
}

export default CourseDisplayPage;
