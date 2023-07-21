import dynamic from "next/dynamic";
const Categories = dynamic(() => import("@/components/home-page-components/Categories"));
import FeaturedCourse from "@/components/home-page-components/FeaturedCourse";


function Page() {
  return (
    <div className="container mx-auto px-4 max-w-screen-xl ">
      <FeaturedCourse />
      <Categories />
    </div>
  );
}

export default Page;
