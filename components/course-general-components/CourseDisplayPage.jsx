"use client";
import React from "react";
import { useState, useEffect } from "react";
import CourseList from "./CourseList";
import CourseOverview from "./CourseOverview";

function CourseDisplayPage({ pageTitle, navigationPath, navigationName }) {
  const [selectedCourse, setSelectedCourse] = useState({});
  const [contentButtonPressed, setContentButtonPressed] = useState(false);

  function handleCourseClick(course) {
    setSelectedCourse(course);
  }

  function handleNotifyContent() {
    if (selectedCourse) {
      setContentButtonPressed(true);
    }
  }

  if (contentButtonPressed) {
    return (
      <div>
        <h1>Content Button Pressed, This Is The Selected Course: {selectedCourse}</h1>
      </div>
    )
  }

  return (
    <div className="flex w-full justify-end">
      <div className="container m-2 flex flex-col h-screen gap-2 lg:max-w-[1280px] lg:grid lg:grid-cols-2 lg:mx-auto">
        <CourseList
          onCourseClick={handleCourseClick}
          selectedCourse={selectedCourse}
          pageTitle={pageTitle || "Enter Page Title Here"}
          navigationPath={navigationPath || "./home"}
          navigationName={navigationName || "Enter Page Name To Navigate Here"}
        />
        <CourseOverview selectedCourse={selectedCourse} notifyContent={handleNotifyContent}/>
      </div>
    </div>
  );
}

export default CourseDisplayPage;
