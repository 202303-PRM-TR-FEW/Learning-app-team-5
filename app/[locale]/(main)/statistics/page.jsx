"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CourseButton from "@/components/course-general-components/CourseButton";
import MyPerformance from "@/components/statistics-page-components/MyPerformance";
import ThisWeek from "@/components/statistics-page-components/ThisWeek";
import { UserAuth } from "app/context/AuthContext.js";
import { db } from "../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import CourseModules from "@/components/statistics-page-components/CourseModules";
import MockUsers from "@/components/statistics-page-components/UpdateUserProgress";


function Statistics() {
  const { user } = UserAuth();
  console.log(user);

  const createUserProgressDoc = async () => {
    if (!user) console.log("Error: No user logged in");
    try {
      const userID = user.uid;
      console.log(userID);
      const userRef = doc(db, "users", `${userID}`);
      await updateDoc(userRef, {
        courseProgress: "test",
        newTest: "test2",
      });
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  };

  createUserProgressDoc();

  return (
    <>
      <div className="w-full lg:w-1/2 h-screen m-4">
        <ThisWeek />
        <MyPerformance />
         <CourseModules /> 
        <MockUsers />
      </div>
    </>
  );
}

export default Statistics;
