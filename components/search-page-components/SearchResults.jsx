"use client";
import React from "react";
import Course from "../home-page-components/CourseCard";

function SearchResults({ searchResult, setError }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {searchResult.map((course) => (
        <Course
          key={course.id}
          title={course.title}
          authorName={course.instructorName}
          authorImage={course.instructorImage}
          courseImage={course.courseImage}
          duration={course.duration}
          rating={course.rating}
          id={course.uid}
          setError={setError}
        />
      ))}
    </div>
  );
}

export default SearchResults;
