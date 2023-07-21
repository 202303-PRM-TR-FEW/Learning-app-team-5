import dynamic from "next/dynamic";
const Categories = dynamic(() => import("@/components/home-page-components/Categories"));
import FeaturedCourse from "@/components/home-page-components/FeaturedCourse";


function Page() {
  return (
    <div
      className="container mx-auto px-4 
    max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1370px] 3xl:w-[1650px]"
    >
      <FeaturedCourse />
      <Categories />
    </div>
  );
}

export default Page;
