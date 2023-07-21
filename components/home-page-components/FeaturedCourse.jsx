"use client";
import  { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
// import { useTranslations } from "next-intl";

import { GetRandomNumbers } from "../../app/context/RandomNumbers";
import Course from "./CourseCard";

function FeaturedCourse() {
  // const t = useTranslations("Home");
  const { getRandomNumbers } = GetRandomNumbers();
  const [courses, setCourses] = useState([]);

  //  fetch courses data from firebase courses collection
  useEffect(() => {
    const q = query(collection(db, "course-data") );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const coursesArray = [];

      querySnapshot.forEach((doc) => {
        coursesArray.push({ ...doc.data(), id: doc.id });
      });

      setCourses(getRandomNumbers(coursesArray, 4));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold py-2">Featured Courses </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
    </div>
  );
}

export default FeaturedCourse;
