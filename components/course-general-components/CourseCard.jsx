import React, { useState, useEffect } from "react";
import "./CourseCard.css";
import CourseButton from "./CourseButton";
import { Spinner } from "@material-tailwind/react";
import {
  doc,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "@/app/context/AuthContext";

function CourseCard({ course, mockProgress, onClick, selectedStyle }) {
  const [width, setWidth] = useState(0);
  const [isSaved, setisSaved] = useState(false);
  const [isClicked, setisClicked] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [Registered, setIsRegistered] = useState(false);

  const { user } = UserAuth();

  const handleCouresStates = async () => {
    const courseDoc = doc(db, "course-data", course.uid);
    const courseSnapshot = await getDoc(courseDoc);
    const isUserSaved = courseSnapshot.data().isSaved.includes(user.uid);
    const isUserRegistered = courseSnapshot
      .data()
      .isRegistered.includes(user.uid);
    setisSaved(isUserSaved);
    setIsRegistered(isUserRegistered);
  };

  useEffect(() => {
    setWidth(mockProgress);
    if (user) handleCouresStates();
  }, []);

  const handleBookmarkToggle = async () => {
    // Get a reference to the course document
    const courseDoc = doc(db, "course-data", course.uid); // replace 'courseId' with the actual course ID

    // Check if the user's ID is already in the 'isSaved' array
    const courseSnapshot = await getDoc(courseDoc);
    const isUserSaved = courseSnapshot.data().isSaved.includes(user.uid);

    // Update the 'isSaved' array based on whether the user's ID is already saved or not
    if (isUserSaved) {
      setisSaved(false);
      // Remove the user's ID from the 'isSaved' array
      await updateDoc(courseDoc, {
        isSaved: arrayRemove(user.uid),
      });
    } else {
      setisSaved(true);
      // Add the user's ID to the 'isSaved' array
      await updateDoc(courseDoc, {
        isSaved: arrayUnion(user.uid),
      });
    }
  };

  const handleGetCourse = async () => {
    // Get a reference to the course document
    const courseDoc = doc(db, "course-data", course.uid);

    // Add the user's ID to the 'isRegistered' array
    await updateDoc(courseDoc, {
      isRegistered: arrayUnion(user.uid),
    });
    setIsRegistered(true);
    console.log(course.uid);
  };
  function handleCardClick() {
    onClick(course);
    setisClicked(!isClicked);
  }

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`course-card m-4 p-2 bg-white dark:bg-indigoDay rounded-2xl shadow-md flex cursor-pointer ${selectedStyle}`}
    >
      {/* Course Image */}
      <div id="course-img" className="hidden sm:block rounded-xl w-1/2">
        {isImageLoading && (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Spinner className="h-4 w-4" />
          </div>
        )}
        <img
          src={course.courseImage}
          alt="Course Image"
          className="object-contain rounded-xl h-full"
          onLoad={handleImageLoad}
          style={isImageLoading ? { display: "none" } : { display: "block" }}
        />
      </div>
      {/* Course Body */}
      <div className="flex flex-col justify-between w-full ml-4 p-4 gap-4">
        {/* Course Info & Save Bookmark */}
        <div className="flex w-full justify-between gap-4 items-start">
          {/* Course Title and Instructor Name */}
          <div>
            <h1
              className="text-[#373737] dark:text-white text-lg flex-wrap font-bold"
              style={{ fontFamily: "Dela Gothic One, sans-serif" }}
            >
              {course.title}
            </h1>
            <h2 className="text-gray-500 mt-1 text-sm">
              {course.instructorName}
            </h2>
          </div>
          {/* Save Bookmark */}
          <label className={`ui-bookmark ${isSaved ? "active" : ""}`}>
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

        {Registered ? (
          /* Progress */
          <div id="course-progress" className="mt-4">
            {/* Progress Bar */}
            <div className="bg-gray-200 rounded-full overflow-hidden h-3">
              <div
                className="bg-gradient-to-r from-blue-200 to-blue-600 h-full rounded-full"
                style={{ width: `${width}%`, transition: "width 1s" }}
              ></div>
            </div>
            {/* Progress Text */}
            <div className="pt-1 text-gray-500 dark:text-bodyWhite text-xs font-bold mt-1">
              {width}% complete
            </div>
          </div>
        ) : (
          /* Not Started and Enroll */
          <div className="flex w-full justify-between items-center">
            <div className="w-full text-gray-500 text-sm font-bold">
              Not Started
            </div>
            <CourseButton buttonName="Enroll" handleClick={handleGetCourse} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
