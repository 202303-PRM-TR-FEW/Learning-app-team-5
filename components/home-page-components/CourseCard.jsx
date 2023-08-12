"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { UserAuth } from "../../app/context/AuthContext";
import {
  doc,
  arrayUnion,
  updateDoc,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
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
  setError,
  id,
}) {
  console.log(authorImage);
  const t = useTranslations("Home");
  const d = useTranslations("Discussion");

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [Registered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState(null);

  //  return the state of user is sign in or not
  const { user } = UserAuth();

  const placeHolderImage =
    "https://firebasestorage.googleapis.com/v0/b/learning-app-team-5.appspot.com/o/review-placeholder-1.png?alt=media&token=e928937b-03be-49ab-8e26-170e44d9aa8a";

  // check if the course is saved or registered to handle the user interface
  const handleCouresStates = async () => {
    const courseDoc = doc(db, "course-data", id);
    const courseSnapshot = await getDoc(courseDoc);
    const isUserSaved = courseSnapshot.data().isSaved.includes(user.uid);
    const isUserRegistered = courseSnapshot
      .data()
      .isRegistered.includes(user.uid);
    setIsBookmarked(isUserSaved);
    setIsRegistered(isUserRegistered);
  };

  useEffect(() => {
    if (user) handleCouresStates();
  }, [user]);

  const handleBookmarkToggle = async () => {
    if (!user) {
      setError(d("Error-1"));
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else {
      // Get a reference to the course document
      const courseDoc = doc(db, "course-data", id);

      // Check if the user's ID is already in the 'isSaved' array
      const courseSnapshot = await getDoc(courseDoc);
      const isUserSaved = courseSnapshot.data().isSaved.includes(user.uid);

      // Update the 'isSaved' array based on whether the user's ID is already saved or not
      if (isUserSaved) {
        setIsBookmarked(false);
        // Remove the user's ID from the 'isSaved' array
        await updateDoc(courseDoc, {
          isSaved: arrayRemove(user.uid),
        });
      } else {
        setIsBookmarked(true);
        // Add the user's ID to the 'isSaved' array
        await updateDoc(courseDoc, {
          isSaved: arrayUnion(user.uid),
        });
      }
    }
  };

  const handleGetCourse = async () => {
    if (!user) {
      setError(d("Error-1"));
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else {
      // Get a reference to the course document
      const courseDoc = doc(db, "course-data", id);

      // Check if the user's ID is already in the 'isRegistered' array
      const courseSnapshot = await getDoc(courseDoc);
      const isUserRegistered = courseSnapshot
        .data()
        .isRegistered.includes(user.uid);

      // Update the 'isRegistered' array based on whether the user's ID is already saved or not
      if (isUserRegistered) {
        setIsRegistered(false);
        // Remove the user's ID from the 'isRegistered' array
        await updateDoc(courseDoc, {
          isRegistered: arrayRemove(user.uid),
        });
        setMessage(t("Message-2"));
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        setIsRegistered(true);
        // Add the user's ID to the 'isRegistered' array
        await updateDoc(courseDoc, {
          isRegistered: arrayUnion(user.uid),
        });
        setMessage(t("Message-1"));
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  const handleOnLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="rounded-xl bg-white p-2 course-item flex-col w-full my-6 relative dark:bg-indigoDay w-full">
      <div>
        <div className="relative ">
          {isLoading && (
            <div className="flex justify-center items-center h-32">
              <Spinner className="h-8 w-8" />
            </div>
          )}
          {message ? (
            <div className="rounded-lg h-32 w-[100%] flex justify-center items-center">
              <p className="bg-green-200 rounded-md border-2 border-green-600 text-lightBlack px-3 py-1 font-medium">
                {message}
              </p>
            </div>
          ) : (
            <img
              className="rounded-lg h-32 w-[100%] "
              src={courseImage}
              alt="courseImage"
              onLoad={handleOnLoad}
              style={isLoading ? { display: "none" } : { display: "block" }}
            />
          )}

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
          <img
            className="rounded-full px-1  h-12 w-12"
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
            onClick={handleGetCourse}
            className="cursor-pointer bg-primaryBlue  px-4 py-2 text-white rounded-full mx-[2px]"
          >
            {Registered ? t("button-2") : t("button")}
          </span>
        </div>
        <span></span>
      </div>
    </div>
  );
}
export default Course;
