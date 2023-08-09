"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { GetRandomNumbers } from "../../app/context/RandomNumbers";
import { GetAllCourses } from "../../app/context/FetchAllCourses";
import Course from "./CourseCard";

function FeaturedCourse() {
  const t = useTranslations("Home");
  const { getRandomNumbers } = GetRandomNumbers();
  const { Allcourses } = GetAllCourses();

  const [Error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (Allcourses.length > 1) {
      setCourses(getRandomNumbers(Allcourses, 4));
    }
  }, [Allcourses]);

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-3xl font-bold pt-12 md:pt-0">{t("title-1")}</h1>
      </div>
      {Error && (
        <div className="self-center text-center text-red-400 text-xl font-bold bg-red-100 my-2 py-4 w-1/2 rounded-xl border-2 border-red-500">
          {Error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {courses?.map((course) => {
          return (
            <Course
              key={course.title}
              title={course.title}
              authorName={course.instructorName}
              authorImage={course.instructorImage}
              courseImage={course.courseImage}
              duration={course.duration}
              rating={course.rating}
              setError={setError}
              id={course.uid}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedCourse;
