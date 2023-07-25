"use client";
import React, { useState } from "react";
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { UserAuth } from "../../app/context/AuthContext";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import "./Bookmark.css";
// import { useTranslations } from "next-intl";

function Course({
  id,
  title,
  authorName,
  authorImage,
  courseImage,
  rating,
  duration,
  saved,
  registered,
}) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const [isSaved, setIsSaved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  //  return the state of user is sign in or not
  const { user } = UserAuth();

  // const t = useTranslations("Home");

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
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
    <div className="rounded-xl bg-white p-2 course-item flex-col w-full my-6 relative dark:bg-indigoDay ">
      <div>
        <div className="relative ">
          <img
            className="rounded-lg h-32 w-[100%] "
            src={courseImage}
            alt="courseImage"
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
        <div className="justify-around rounded-full bg-white shadow-2xl flex w-[55%] py-1 absolute mt-[-25px] dark:bg-purssianBlue">
          <img
            className="rounded-full h-12 w-12"
            src={authorImage}
            alt="authorImage"
          />
          <h2 className="px-3 self-center">{authorName}</h2>
        </div>
        <h1 className="font-bold  mt-10  course_title">{title}</h1>

        <div
          className="flex flex-row justify-between items-center py-2 "
          style={{ color: "#b1b1b1" }}
        >
          <span>
            <AccessTimeFilledOutlinedIcon />{" "}
            {`${hours != 0 ? `${hours} h` : ""}  ${minutes} m`}
          </span>
          <span className="">
            <StarBorderOutlinedIcon /> {rating} /5
          </span>
          <span
            // onClick={handleGetCourse}
            className="cursor-pointer bg-primaryBlue  px-4 py-2 text-white rounded-full mx-[2px]"
          >
            Get
          </span>
        </div>
        <span></span>
      </div>
    </div>
  );
}
export default Course;
