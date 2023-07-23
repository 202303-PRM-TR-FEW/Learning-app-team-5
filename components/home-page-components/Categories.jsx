"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const TrendingUpIcon = dynamic(() => import("@mui/icons-material/TrendingUp"));
const GroupsIcon = dynamic(() => import("@mui/icons-material/Groups"));
const GestureIcon = dynamic(() => import("@mui/icons-material/Gesture"));
const StorageOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/StorageOutlined")
);
const DesignServicesOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/DesignServicesOutlined")
);
const TipsAndUpdatesIcon = dynamic(() =>
  import("@mui/icons-material/TipsAndUpdates")
);
const AutoAwesomeIcon = dynamic(() =>
  import("@mui/icons-material/AutoAwesome")
);
const CodeIcon = dynamic(() => import("@mui/icons-material/Code"));
import Link from "next/link";
import { useTranslations } from "next-intl";

function Categories() {
 const t = useTranslations('Home')
  const categories = [
    {
      name: `${t("Sales")}`,
      icon: <TrendingUpIcon style={{ fontSize: 45 }} />,
      slug: "sales",
    },
    {
      name: `${t("HR")}`,
      icon: <GroupsIcon style={{ fontSize: 45 }} />,
      slug: "hr",
    },
    {
      name: `${t("Drawing")}`,
      icon: <GestureIcon style={{ fontSize: 45 }} />,
      slug: "drawing",
    },
    {
      name: `${t("Big Data")}`,
      icon: <StorageOutlinedIcon style={{ fontSize: 45 }} />,
      slug: "big-data",
    },
    {
      name: `${t("Design")}`,
      icon: <DesignServicesOutlinedIcon style={{ fontSize: 45 }} />,
      slug: "design",
    },
    {
      name: `${t("Marketing")}`,
      icon: <TipsAndUpdatesIcon style={{ fontSize: 45 }} />,
      slug: "marketing",
    },
    {
      name: `${t("Astronomy")}`,
      icon: <AutoAwesomeIcon style={{ fontSize: 45 }} />,
      slug: "astronomy",
    },
    {
      name: `${t("Web Development")}`,
      icon: <CodeIcon style={{ fontSize: 45 }} />,
      slug: "web-development",
    },
  ];

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);



function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

  useEffect(() => {
    const handleResize = debounce(() => setWindowWidth(window.innerWidth), 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const categoriesToShow = showAllCategories
    ? categories
    : windowWidth < 640
    ? categories.slice(0, 3)
    : categories;

  const handleShowMore = () => {
    setShowAllCategories(true);
  };

  const handleShowLess = () => {
    setShowAllCategories(false);
  };

  return (
    <div className="font-sans">
      <h2 className="text-4xl font-bold py-6">{t("title-2")}</h2>
      <div className="grid place-content-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-x-20">
        {categoriesToShow.map((category) => (
          <Link
            href={`/home/${category.slug}`}
            key={category.slug}
          >
            <button className="box-content border-2 p-3 drop-shadow-md leading-10 w-72 lg:w-64 3xl:w-80 h-44 bg-white rounded-xl mb-2 text-lg text-gray-500 hover:text-blue-500 hover:bg-blue-200 hover:border-blue-400 flex flex-col items-center justify-center">
              {category.icon}
              <span className="mt-2">{category.name}</span>
            </button>
          </Link>
        ))}
        {!showAllCategories && windowWidth < 640 && (
          <button
            className="box-content border-2 p-3 drop-shadow-md leading-10 sm:w-72 lg:w-64 3xl:w-80 h-44 bg-white rounded-xl mb-2 text-lg text-gray-500 hover:text-blue-500 hover:bg-blue-200 hover:border-blue-400 flex flex-col items-center justify-center"
            onClick={handleShowMore}
          >
            <span className="mt-2">{t("more")}</span>
          </button>
        )}
        {showAllCategories && windowWidth < 640 && (
          <button
            className="box-content border-2 p-3 drop-shadow-md leading-10 sm:w-72 lg:w-64 3xl:w-80 h-44 bg-white rounded-xl mb-2 text-lg text-gray-500 hover:text-blue-500 hover:bg-blue-200 hover:border-blue-400 flex flex-col items-center justify-center"
            onClick={handleShowLess}
          >
            <span className="mt-2">{t("less")}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Categories;
