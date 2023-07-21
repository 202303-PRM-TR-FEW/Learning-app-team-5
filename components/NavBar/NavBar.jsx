import Link from "next/link";

import {
  HOME_ICON,
  SEARCH_ICON,
  COURSES_ICON,
  PROFILE_ICON,
  LEARNU_ICON,
} from "../../public/assets/svgPath";

// Define the navigation items as an array of objects
const navigationItems = [
  {
    href: "/home",
    icon: HOME_ICON,
    text: "Home",
  },
  {
    href: "/search",
    icon: SEARCH_ICON,
    text: "Search",
  },
  {
    href: "/courses",
    icon: COURSES_ICON,
    text: "Courses",
  },
  {
    href: "/profile",
    icon: PROFILE_ICON,
    text: "Login",
  },
];

function NavBar() {
  return (
    <>
      <div className="absolute top-7 left-6 z-50 py-2">
        <Link href="/">
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
      <div className="flex justify-center md:flex-col md:mt-[4em] md:w-20 ">
        <nav className="fixed bottom-2 md:absolute top-auto md:top-2 z-50">
          <ul className="flex justify-evenly mt-20 md:justify-evenly w-[86vw] list-none md:bg-transparent bg-black/80 backdrop-blur-l p-[1em] rounded-[20px] md:flex-col md:items-center md:h-[25em] md:w-[7em] z-50">
            {/* Render the navigation items dynamically */}
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="mainLinks no-underline text-[#b1b1b1] hover:text-primaryBlue"
                >
                  <span className="flex flex-col items-center">
                    <svg
                      className="w-full h-6 lg:h-7 overflow-visible z-[1] fill-[#b1b1b1]  hover:fill-primaryBlue"
                      viewBox="0 0 576 512"
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
