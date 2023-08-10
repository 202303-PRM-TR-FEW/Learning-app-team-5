"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const AccessTimeIcon = dynamic(() => import("@mui/icons-material/AccessTime"), {
  ssr: false,
});


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


import CourseButton from "../CourseButton";
import DropUpMenu from "../(review-components)/DropUpMenu";
import RatingStars from "../(review-components)/RatingStars";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Test1({ selectedCourse }) {
  const [showArrowIcons, setShowArrowIcons] = useState(false);
  const t = useTranslations("Courses");

  return (
    <div className="flex flex-col bg-white dark:bg-indigoDay p-4 lg:mx-2 md:mx-2 rounded-lg shadow-md justify-between ">
      {/* IDENTITY */}
      <div className="lg:h-2/3 w-auto lg:flex lg:flex-col lg:justify-between grid grid-cols-2 lg:mb-2 mb-6 h-full">
        {/* IMAGE OR VIDEO  */}
        <div
          className="hidden sm:block h-[300px] p-4 rounded-lg w-full lg:w-full"
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
                {selectedCourse.rating}
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
        <div className="flex flex-col justify-center my-2 mt-8">
          <h2 className="text-[#373737] text-xl font-semibold mb-4">
            {t("Descripttion")}
          </h2>
          {/* description content */}
          <div className="max-h-14 overflow-y-auto lg:max-h-full">
            <p className="text-gray-700 text-justify dark:text-bodyWhite">
              {selectedCourse.description}
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Test1;
