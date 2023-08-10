"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { GetAllCourses } from "../../app/context/FetchAllCourses";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { UserAuth } from "app/context/AuthContext.js";

function Temp() {
  const [courses, setCourses] = useState([]);
  const { Allcourses, isLoading } = GetAllCourses();
  const [courseModules, setCourseModules] = useState([]);
  const [isModuleLoading, setIsModuleLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, userData } = UserAuth();
  const [coursesWithModules, setCoursesWithModules] = useState([]);

  useEffect(() => {
    const getCourses = () => {
      setCourses(Allcourses);
    };
    getCourses();
  }, [Allcourses]);

  useEffect(() => {
    const q = query(collection(db, "course-modules"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const courseModulesArray = [];

        querySnapshot.forEach((doc) => {
          courseModulesArray.push({ ...doc.data(), id: doc.id });
        });

        setCourseModules(courseModulesArray);
        setIsModuleLoading(false);
      },
      (error) => {
        setError(error); // Handle errors in the snapshot listener
        setIsModuleLoading(false); // In case of error, still set isLoading to false
      }
    );

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (courseModules.length > 0) {
      const coursesWithModulesArray = [];
      courses.forEach((course) => {
        const courseModule = courseModules.find(
          (module) => module.moduleID === course.id
        );
        coursesWithModulesArray.push({...course, courseModule: courseModule});
      });
      if (coursesWithModulesArray.length === 80) {
        setCoursesWithModules(coursesWithModulesArray);
      }
    }
  }, [courseModules]);

  console.log(user);
  console.log(userData);
  
  useEffect(() => {
    console.log(coursesWithModules);
  }, [coursesWithModules]);



  const exampleUser = {
    username: "John Doe",
    email: "johndoe@gmail.com",
    // enrolledCourses: [19, 23, 6],
/*     courseProgress: [
      {
        courseID: 19,
        moduleID: 1,
        moduleProgress: 0.5,
        moduleCompleted: false,
      },
      {
        courseID: 19,
        moduleID: 2,
        moduleProgress: 0.75,
        moduleCompleted: false,
      },
      {
        courseID: 23,
        moduleID: 1,
        moduleProgress: 0.2,
        moduleCompleted: false,
      },
      {
        courseID: 23,
        moduleID: 2,
        moduleProgress: 0.15,
        moduleCompleted: false,
      },
      {
        courseID: 6,
        moduleID: 1,
        moduleProgress: 1,
        moduleCompleted: true,
      },
      {
        courseID: 6,
        moduleID: 2,
        moduleProgress: 0.5,
        moduleCompleted: false,
      },
    ], */
    enrolledCourses: [
      {
        courseID: 19,
        courseModuleProgress: [
          {
            moduleID: 1,
            moduleProgress: 1,
          },
          {
            moduleID: 2,
            moduleProgress: 0.5,
          },
        ]
      },
      {
        courseID: 23,
        courseModuleProgress: [
          {
            moduleID: 1,
            moduleProgress: 0.25,
          },
          {
            moduleID: 2,
            moduleProgress: 0.85,
          },
        ]
      }
    ]
  };




  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto m-4">
      <div className="flex justify-between items-center m-4 p-4 bg-[#56a0fe] opacity-80 rounded lg:sticky top-0 z-50"></div>
    </div>
  );
}

export default Temp;
