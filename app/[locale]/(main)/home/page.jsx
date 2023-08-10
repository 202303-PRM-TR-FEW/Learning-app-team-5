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
        <div className="flex justify-center items-center h-screen dark:min-h-screen">
          <Spinner className="h-14 w-14" />
        </div>
      ) : (
        <div className=" mx-auto px-4 dark:min-h-screen lg:max-w-[1280px] dark:text-bodyWhite">
          <FeaturedCourse />
          <Categories />
        </div>
      )}
    </>
  );
}

export default Page;
