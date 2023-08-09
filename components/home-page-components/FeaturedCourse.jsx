"use client";
import { useEffect, useState } from "react";
// import { collection, query, onSnapshot } from "firebase/firestore";
// import { db } from "@/firebase";
import { useTranslations } from "next-intl";
import { GetRandomNumbers } from "../../app/context/RandomNumbers";
import { GetAllCourses } from "../../app/context/FetchAllCourses";
import Course from "./CourseCard";

function FeaturedCourse() {
  const t = useTranslations("Home");
  const { getRandomNumbers } = GetRandomNumbers();
  const { Allcourses, isLoading } = GetAllCourses();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (Allcourses.length > 1) {
      setCourses(getRandomNumbers(Allcourses, 4));
    }
  }, [Allcourses]);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold pt-12 md:pt-0">{t("title-1")}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-x-0 md:gap-x-6 justify-items-center">
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
              saved={course.isSaved}
              registered={course.registered}
              t={t}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedCourse;
