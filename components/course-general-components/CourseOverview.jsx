"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const AccessTimeIcon = dynamic(() => import("@mui/icons-material/AccessTime"));
const StarBorderIcon = dynamic(() => import("@mui/icons-material/StarBorder"));
const ArrowBackIcon = dynamic(() => import("@mui/icons-material/ArrowBack"));
const ArrowUpwardOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/ArrowUpwardOutlined")
);
const WavingHandOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/WavingHandOutlined")
);
const CategoryOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/CategoryOutlined")
);
const LeaderboardOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/LeaderboardOutlined")
);

import "./CourseCard.css";
import CourseButton from "./CourseButton";
import Image from "next/image";

function CourseOverview({ selectedCourse }) {
  const [showArrowIcons, setShowArrowIcons] = useState(false);

  /* This delay for arrow icons is necessary due to the nature of React's initial render! */
  useEffect(() => {
    const delay = setTimeout(() => {
      setShowArrowIcons(true);
    }, 100);
    return () => clearTimeout(delay);
  }, []);

  if (!selectedCourse) {
    return (
      <div className="flex flex-col bg-[rgba(251,_251,_251,_0.5)] p-4 m-4 rounded-2xl shadow-md justify-center items-center ">
        <div className="flex w-full justify-center items-center">
          <WavingHandOutlinedIcon className="text-[#56a0fe] text-6xl h-1/2 mr-2" />
          <h1 className="text-2xl font-bold text-[#56a0fe]">Hey there!</h1>
        </div>
        {showArrowIcons && (
          <div className="flex w-full justify-center items-center">
            <ArrowBackIcon className="arrow-icon arrow-icon-lg" />
            <ArrowUpwardOutlinedIcon className="arrow-icon arrow-icon-sm" />
            <p className="ml-2">Please select a course to view</p>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-[#fbfbfb] p-4 m-4 rounded-2xl shadow-md justify-between">
      {/* IDENTITY */}
      <div className="lg:h-2/3 w-auto lg:flex lg:flex-col lg:justify-between grid grid-cols-2 lg:mb-2 mb-6 h-full">
        {/* IMAGE OR VIDEO  */}
        <div
          className="hidden sm:block h-full p-4 rounded-2xl w-full lg:w-full"
          style={{
            backgroundImage: `url(${selectedCourse.courseImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* INFO */}
        <div className="ml-2 w-full">
          {/* title */}
          <h1 className="text-[#373737] text-2xl font-semibold my-4">
            {selectedCourse.title}
          </h1>
          {/* tutor name */}
          <div className="rounded-3xl bg-[#fbfbfb] drop-shadow-[0_0_6px_rgba(0,0,0,0.15)] h-12 w-max flex items-center pr-4 my-8">
            <img
              src={selectedCourse.instructorImage}
              alt="instructor"
              className="h-9 w-9 rounded-full ml-1"
            />
            <h2 className="ml-2">{selectedCourse.instructorName}</h2>
          </div>

          {/* sub-info */}
          <div className="flex flex-col justify-end">
            {/* category */}
            <div className="flex items-center my-2">
              <CategoryOutlinedIcon className="text-gray-600" />
              <p className="text-gray-600 text-base ml-2 capitalize">
                {selectedCourse.category}
              </p>
            </div>
            {/* level */}
            <div className="flex items-center my-2">
              <LeaderboardOutlinedIcon className="text-gray-600" />
              <p className="text-gray-600 text-base ml-2 capitalize">
                {selectedCourse.level}
              </p>
            </div>
            {/* duration */}
            <div className="flex items-center my-2">
              <AccessTimeIcon className="text-gray-600" />
              <p className="text-gray-600 text-base ml-2">
                {Math.floor(selectedCourse.duration / 60) > 0
                  ? `${Math.floor(selectedCourse.duration / 60)}h `
                  : ""}
                {selectedCourse.duration % 60}mins.
              </p>
            </div>
            {/* rating */}
            <div className="flex items-center my-2">
              <StarBorderIcon className="text-gray-600" />
              <p className="text-gray-600 text-base ml-2">
                {selectedCourse.rating}
                <span className="text-sm text-gray-500"> / 5.0</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="h-1/3 hidden lg:block">
        {/* description title */}
        <div className="flex flex-col justify-center my-2 mt-8">
          <h2 className="text-[#373737] text-xl font-semibold mb-4">
            Course Description
          </h2>
          {/* description content */}
          <div className="max-h-14 overflow-y-auto lg:max-h-full">
            <p className="text-gray-700 text-justify">
              {selectedCourse.description}
            </p>
          </div>
        </div>
      </div>

      {/* PREVIEW AND ENROLL BUTTONS */}
      <div className="flex justify-between my-4">
        <CourseButton
          buttonName={selectedCourse.isRegistered ? "Review" : "Preview"}
          handleClick={() =>
            console.log("add preview page navigation to handleClick function")
          }
        />
        <CourseButton
          buttonName={selectedCourse.isRegistered ? "Continue" : "Enroll"}
          handleClick={() =>
            console.log("add enroll page navigation to handleClick function")
          }
        />
      </div>
    </div>
  );
}

export default CourseOverview;
