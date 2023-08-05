"use client";
import CourseDisplayPage from "@/components/course-general-components/CourseDisplayPage";
import { useTranslations } from "next-intl";
import { UserAuth } from "@/app/context/AuthContext";
import Link from "next/link";

function MyCourses({ params }) {
  const t = useTranslations("Courses");
  //  User state
  const { user } = UserAuth();

  return (
    <>
      {user ? (
        <CourseDisplayPage
          pageTitle={t("title-1")}
          navigationPath={"./saved"}
          navigationName={t("title-2")}
        />
      ) : (
        <div className="h-screen flex justify-center items-center font-bold text-xl md:text-2xl dark:text-bodyWhite ">
          <div className="w-[90%] md:w-[50%] m-x-auto bg-white dark:bg-indigoDay rounded-[20px] text-center">
            {params.locale === "en" ? (
              <p className="px-4 py-2 md:p-8">
                Please{" "}
                <Link
                  href="./login"
                  className="text-primaryBlue underline underline-offset-3 hover:text-blue-700"
                >
                  Sign In
                </Link>{" "}
                to access your courses.
              </p>
            ) : (
              <p className="px-4 py-2 md:p-8">
                kurslarınızı görüntülemek için lütfen önce{" "}
                <Link
                  href="./login"
                  className="text-primaryBlue  underline underline-offset-3 hover:text-blue-700"
                >
                  oturum açın
                </Link>{" "}
                .
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MyCourses;
