"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import useScreenType from "./useScreenType";
import { useTranslations } from "next-intl";
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
import RatingStars from "../Review-components/RatingStars";
import DropUpMenu from "../Review-components/DropUpMenu";

function CourseOverview({ selectedCourse }) {
  const [showArrowIcons, setShowArrowIcons] = useState(false);
  const [newReating, setNewRating] = useState(null);
  const t = useTranslations("Courses");
  const isMobile = useScreenType();
  /* This delay for arrow icons is necessary due to the nature of React's initial render! */
  useEffect(() => {
    const delay = setTimeout(() => {
      setShowArrowIcons(true);
    }, 100);
    return () => clearTimeout(delay);
  }, []);

  if (!selectedCourse) {
    return (
      <div
        className={`flex flex-col bg-[rgba(251,_251,_251,_0.5)] dark:bg-indigoDay p-4 m-4 rounded-2xl shadow-md justify-center items-center ${
          isMobile === "mobile" ? "h-[40%]" : ""
        } `}
      >
        <div className="flex w-full justify-center items-center">
          <WavingHandOutlinedIcon className="text-[#56a0fe] text-6xl h-1/2 mr-2" />
          <h1 className="text-2xl font-bold text-[#56a0fe]">
            {t("Message-1")}
          </h1>
        </div>
        {showArrowIcons && (
          <div className="flex w-full justify-center items-center">
            {isMobile === "mobile" ? (
              <ArrowUpwardOutlinedIcon className="arrow-icon " />
            ) : (
              <ArrowBackIcon className="arrow-icon " />
            )}

            <p className="ml-2">{t("Message-2")}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white dark:bg-indigoDay overflow-y-auto p-4 m-4 rounded-2xl shadow-md justify-between ">
      {/* IDENTITY */}
      <div className=" w-auto lg:flex lg:flex-col lg:justify-between grid grid-cols-2 lg:mb-2 mb-6 ">
        {/* IMAGE OR VIDEO  */}
        <div
          className="hidden sm:block h-[350px] p-4 rounded-2xl w-full lg:w-full"
          style={{
            backgroundImage: `url(${selectedCourse.courseImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* INFO */}
        <div className="ml-2 w-full">
          {/* title */}
          <h1 className="text-[#373737] dark:text-white text-2xl font-semibold my-4">
            {selectedCourse.title}
          </h1>
          {/* tutor name */}
          <div className="rounded-3xl bg-[#fbfbfb] dark:bg-purssianBlue drop-shadow-[0_0_6px_rgba(0,0,0,0.15)] h-12 w-max flex items-center pr-4 my-8">
            <img
              src={selectedCourse.instructorImage}
              alt="instructor"
              className="h-9 w-9 rounded-full ml-1"
            />
            <h2 className="ml-2">{selectedCourse.instructorName}</h2>
          </div>

          {/* sub-info */}
          <div className="flex flex-col justify-end text-gray-600 dark:text-bodyWhite">
            {/* category */}
            <div className="flex items-center my-2">
              <CategoryOutlinedIcon className="" />
              <p className=" text-base ml-2 capitalize">
                {selectedCourse.category}
              </p>
            </div>
            {/* level */}
            <div className="flex items-center my-2">
              <LeaderboardOutlinedIcon className="" />
              <p className=" text-base ml-2 capitalize">
                {selectedCourse.level}
              </p>
            </div>
            {/* duration */}
            <div className="flex items-center my-2">
              <AccessTimeIcon className="" />
              <p className=" text-base ml-2">
                {Math.floor(selectedCourse.duration / 60) > 0
                  ? `${Math.floor(selectedCourse.duration / 60)} ${t("hour")}`
                  : ""}
                {selectedCourse.duration % 60} {t("minute")}
              </p>
            </div>
            {/* rating */}
            <div className="flex items-center my-2">
              <StarBorderIcon className="" />
              <p className="text-base ml-2">
                {newReating ? newReating : selectedCourse.rating}
                <span className="text-sm text-gray-500 dark:text-white">
                  {" "}
                  / 5.0
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="h-1/3 hidden lg:block">
        {/* description title */}
        <div className="flex flex-col justify-center my-2 mt-6">
          <h2 className="text-[#373737] dark:text-bodyWhite text-xl font-semibold mb-4">
            {t("Descripttion")}
          </h2>
          {/* description content */}
          <div className="max-h-22  ">
            <p className="text-gray-700 text-justify dark:text-bodyWhite">
              {selectedCourse.description}
            </p>
          </div>
        </div>
      </div>

      {/* PREVIEW AND ENROLL BUTTONS */}
      <div className="flex justify-between my-4">
        <DropUpMenu
          buttonName={
            selectedCourse.isRegistered ? t("Button-1") : t("Button-2")
          }
          courseID={selectedCourse.uid}
          setNewRating={setNewRating}
        >
          <RatingStars />
        </DropUpMenu>
        <Link href={`/courses/${selectedCourse.id}`}>
          <button className="cursor-pointer bg-primaryBlue rounded-2xl text-white py-2 px-24 hover:bg-white hover:text-primaryBlue hover:border-primaryBlue hover:border-2  dark:hover:bg-indigoDay dark:hover:border-primaryBlue dark:hover:border-2 text-center">
            {t("Button-3")}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CourseOverview;
