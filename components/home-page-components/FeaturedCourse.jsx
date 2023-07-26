"use client";
import { useEffect, useState } from "react";
// import { collection, query, onSnapshot } from "firebase/firestore";
// import { db } from "@/firebase";
// import { useTranslations } from "next-intl";
import { Spinner } from "@material-tailwind/react";
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
        <h1 className="text-3xl font-bold pb-2">{t("title-1")}</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
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
                saved={course.isSaved}
                registered={course.registered}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FeaturedCourse;
