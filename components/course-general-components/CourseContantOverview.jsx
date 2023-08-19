"use client";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
const AccessTimeIcon = dynamic(() => import("@mui/icons-material/AccessTime"));
const StarBorderIcon = dynamic(() => import("@mui/icons-material/StarBorder"));
const CategoryOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/CategoryOutlined")
);
const LeaderboardOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/LeaderboardOutlined")
);

import "./CourseCard.css";

function CourseContantOverview({ Course }) {
  const t = useTranslations("Courses");

  return (
    <div className="flex flex-col bg-white dark:bg-indigoDay overflow-y-auto p-4 m-4 rounded-2xl shadow-md justify-between ">
      {/* IDENTITY */}
      <div className=" w-auto lg:flex lg:flex-col lg:justify-between grid grid-cols-2 lg:mb-2 mb-6 ">
        {/* IMAGE OR VIDEO  */}
        <div
          className="hidden sm:block h-[350px] p-4 rounded-2xl w-full lg:w-full"
          style={{
            backgroundImage: `url(${Course.courseImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* INFO */}
        <div className="ml-2 w-full">
          {/* title */}
          <h1 className="text-[#373737] dark:text-white text-2xl font-semibold my-4">
            {Course.title}
          </h1>
          {/* tutor name */}
          <div className="rounded-3xl bg-[#fbfbfb] dark:bg-purssianBlue drop-shadow-[0_0_6px_rgba(0,0,0,0.15)] h-12 w-max flex items-center pr-4 my-8">
            <img
              src={Course.instructorImage}
              alt="instructor"
              className="h-9 w-9 rounded-full ml-1"
            />
            <h2 className="ml-2">{Course.instructorName}</h2>
          </div>

          {/* sub-info */}
          <div className="flex flex-col justify-end text-gray-600 dark:text-bodyWhite">
            {/* category */}
            <div className="flex items-center my-2">
              <CategoryOutlinedIcon className="" />
              <p className=" text-base ml-2 capitalize">{Course.category}</p>
            </div>
            {/* level */}
            <div className="flex items-center my-2">
              <LeaderboardOutlinedIcon className="" />
              <p className=" text-base ml-2 capitalize">{Course.level}</p>
            </div>
            {/* duration */}
            <div className="flex items-center my-2">
              <AccessTimeIcon className="" />
              <p className=" text-base ml-2">
                {Math.floor(Course.duration / 60) > 0
                  ? `${Math.floor(Course.duration / 60)} ${t("hour")}`
                  : ""}
                {Course.duration % 60} {t("minute")}
              </p>
            </div>
            {/* rating */}
            <div className="flex items-center my-2">
              <StarBorderIcon className="" />
              <p className="text-base ml-2">
                {Course.rating}
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
              {Course.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseContantOverview;
