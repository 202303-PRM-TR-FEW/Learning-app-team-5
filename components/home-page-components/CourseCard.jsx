"use client";
import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { UserAuth } from "../../app/context/AuthContext";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Spinner } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import "./Bookmark.css";

const AccessTimeFilledOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/AccessTimeFilledOutlined")
);

const StarBorderOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/StarBorderOutlined")
);

function Course({
  title,
  authorName,
  authorImage,
  courseImage,
  rating,
  duration,
}) {
  const t = useTranslations("Home");
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  //  return the state of user is sign in or not
  const { user } = UserAuth();
  const placeHolderImage =
    "https://firebasestorage.googleapis.com/v0/b/learning-app-team-5.appspot.com/o/review-placeholder-1.png?alt=media&token=e928937b-03be-49ab-8e26-170e44d9aa8a";
  // const t = useTranslations("Home");

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleOnLoad = () => {
    setIsLoading(false);
  };

  //set the saved course to user saved courses in firebase
  // const courseID = doc(db, "users", `${user?.email}`);
  // const handleSaveCourse = async () => {
  //   if (user?.email) {
  //     setIsSaved((pre) => !pre);
  //     await updateDoc(courseID, {
  //       savedCourses: arrayUnion({
  //         id: id,
  //         title: title,
  //         authorName: authorName,
  //         authorImage: authorImage,
  //         courseImage: courseImage,
  //         rating: rating,
  //         duration: duration,
  //         isSaved: !saved,
  //       }),
  //     });
  //   } else {
  //     alert("Please sign in to save this course");
  //   }
  // };
  // //set the registerd courses
  // const handleGetCourse = async () => {
  //   if (user?.email) {
  //     await updateDoc(courseID, {
  //       registeredCourses: arrayUnion({
  //         id: id,
  //         title: title,
  //         authorName: authorName,
  //         authorImage: authorImage,
  //         courseImage: courseImage,
  //         rating: rating,
  //         duration: duration,
  //         isRegistered: true,
  //       }),
  //     });
  //   } else {
  //     alert("Please sign in to save this course");
  //   }
  // };

  return (
    <div className="rounded-xl bg-white p-2 course-item flex-col w-full my-6 relative dark:bg-indigoDay w-full">
      <div>
        <div className="relative ">
          {isLoading && (
            <div className="flex justify-center items-center h-32">
              <Spinner className="h-8 w-8" />
            </div>
          )}
          <img
            className="rounded-lg h-32 w-[100%] "
            src={courseImage}
            alt="courseImage"
            onLoad={handleOnLoad}
            style={isLoading ? { display: "none" } : { display: "block" }}
          />
          <div className="absolute top-1 right-1">
            <label className={`ui-bookmark ${isBookmarked ? "active" : ""}`}>
              <input type="checkbox" />
              <div className="bookmark" onClick={handleBookmarkToggle}>
                <svg viewBox="0 0 32 32">
                  <g>
                    <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z" />
                  </g>
                </svg>
              </div>
            </label>
          </div>
        </div>
        <div className="justify-between rounded-full bg-white shadow-2xl flex w-[55%] py-1 absolute mt-[-25px] dark:bg-purssianBlue">
          <Image
            className="rounded-full px-1  h-12 w-12"
            height={20}
            width={20}
            src={isLoading ? placeHolderImage : authorImage}
            alt="auter-image"
          />
          <h2 className="pr-2 self-center">{authorName}</h2>
        </div>
        <h1 className="font-bold  mt-10  course_title">{title}</h1>

        <div
          className="flex flex-row justify-between items-center py-2 "
          style={{ color: "#b1b1b1" }}
        >
          <span className="flex items-center">
            <AccessTimeFilledOutlinedIcon />
            {`${hours != 0 ? `${hours} ${t("hour")}` : ""}  ${minutes} ${t(
              "minute"
            )}`}
          </span>
          <span className="flex items-center">
            <StarBorderOutlinedIcon /> {rating} /5
          </span>
          <span
            // onClick={handleGetCourse}
            className="cursor-pointer bg-primaryBlue  px-4 py-2 text-white rounded-full mx-[2px]"
          >
            {t("button")}
          </span>
        </div>
        <span></span>
      </div>
    </div>
  );
}
export default Course;
