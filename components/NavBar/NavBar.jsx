"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { UserAuth } from "@/app/context/AuthContext";

import {
  HOME_ICON,
  SEARCH_ICON,
  COURSES_ICON,
  PROFILE_ICON,
  Discussion_Icon,
  LEARNU_ICON,
} from "../../public/assets/svgPath";

function NavBar({ params }) {
  const EN = params.locale
  //  user status
  const { user } = UserAuth();
  const t = useTranslations("Navbar");

  // Define the navigation items as an array of objects
  const navigationItems = [
    {
      href: `/${EN}/home`,
      icon: HOME_ICON,
      text: `${t("Home")}`,
    },
    {
      href: `/${EN}/search`,
      icon: SEARCH_ICON,
      text: `${t("Search")}`,
    },
    {
      href: `/${EN}/courses`,
      icon: COURSES_ICON,
      text: `${t("Courses")}`,
    },
    {
      href: `/${EN}/discussions`,
      icon: Discussion_Icon,
      text: `${t("Discussions")}`,
      viewBox: "0 0 24 24",
    },
    {
      href: `${user ? `/${EN}/profile` : `/${EN}/login`}`,
      icon: PROFILE_ICON,
      text: `${user ? t("Profile") : t("Login")}`,
    },
  ];

  return (
    <>
      <div className="absolute top-7 left-6 z-50 py-2 hidden md:block">
        <Link href={`${EN}/`}>
          <span>
            <svg
              className="w-[3em] h-[2em] px-[1em] py-[0.2em] lg:w-[4em] lg:h-[2m] lg:px-[1em] lg:py-[0.4em] bg-blue-500 rounded-[20px] overflow-visible z-[1] fill-white"
              viewBox="0 0 576 512"
            >
              <path d={LEARNU_ICON} />
            </svg>
          </span>
        </Link>
      </div>
      <div className="flex justify-center md:flex-col md:mt-[2em] md:w-20 ">
        <nav className="fixed bottom-2 md:absolute top-auto md:top-1 z-50 mt-20 ">
          <ul className="flex justify-evenly md:justify-evenly w-[76vw] list-none md:bg-transparent bg-black/60 backdrop-blur-l p-[1em] rounded-[20px] md:flex-col md:items-center md:h-[25em] md:w-[6em] z-50">
            {/* Render the navigation items dynamically */}
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="mainLinks no-underline text-[#b1b1b1] hover:text-primaryBlue fill-[#b1b1b1]  hover:fill-primaryBlue"
                >
                  <span className="flex flex-col items-center">
                    <svg
                      className="w-full h-6 lg:h-7 overflow-visible "
                      viewBox={item.viewBox ? "0 0 24 24" : "0 0 576 512"}
                    >
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <span className="hidden lg:block lg:text-center lg:text-sm  ">
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
