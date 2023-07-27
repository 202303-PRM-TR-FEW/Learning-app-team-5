"use client";
import dynamic from "next/dynamic";
const Categories = dynamic(() =>
  import("@/components/home-page-components/Categories")
);
import FeaturedCourse from "@/components/home-page-components/FeaturedCourse";
import { GetAllCourses } from "../../../context/FetchAllCourses";
import { Spinner } from "@material-tailwind/react";

function Page() {
  const { isLoading } = GetAllCourses();

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="h-14 w-14" />
        </div>
      ) : (
        <div
          className="container mx-auto px-4 min-h-screen
    max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1370px] 3xl:w-[1650px] dark:text-bodyWhite"
        >
          <FeaturedCourse />
          <Categories />
        </div>
      )}
    </>
  );
}

export default Page;
