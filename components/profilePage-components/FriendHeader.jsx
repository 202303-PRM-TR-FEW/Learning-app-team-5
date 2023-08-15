import Image from "next/image";
import { useTranslations } from "next-intl";
import { GetAllCourses } from "@/app/context/FetchAllCourses";
import { useState, useEffect } from "react";

const FriendHeader = ({ user }) => {
  const [myCourses, setMyCourses] = useState([]);

  const t = useTranslations("Profile");
  const { Allcourses } = GetAllCourses();

  useEffect(() => {
    if (Allcourses.length > 1) {
      setMyCourses(
        Allcourses.filter((course) => course.isRegistered.includes(user.id))
      );
    }
  }, [Allcourses]);

  return (
    <div className="flex flex-col md:flex-row w-full  gap-2 items-center">
      <div className="flex justify-center self-center w-1/3">
        <Image
          className="rounded-full m-2 object-fill h-36 w-36"
          src={user.photoURL}
          alt="profile image"
          height={150}
          width={150}
          priority={false} // {false} | {true}
        />
      </div>
      <div className="flex flex-col gap-2 shadow-sm w-full">
        <div className="flex justify-between pb-3 md:flex-col">
          <div className="flex justify-between">
            <h1 className="font-extrabold text-2xl">{user.username}</h1>
          </div>
          <div className="flex justify-start items-center text-[#616161] dark:text-bodyWhite">
            {"  "}
            <svg
              viewBox="0 0 288 512"
              className="w-[16px] h-[16px]"
              style={{ fill: "#616161" }}
            >
              <path d="M112 316.94v156.69l22.02 33.02c4.75 7.12 15.22 7.12 19.97 0L176 473.63V316.94c-10.39 1.92-21.06 3.06-32 3.06s-21.61-1.14-32-3.06zM144 0C64.47 0 0 64.47 0 144s64.47 144 144 144 144-64.47 144-144S223.53 0 144 0zm0 76c-37.5 0-68 30.5-68 68 0 6.62-5.38 12-12 12s-12-5.38-12-12c0-50.73 41.28-92 92-92 6.62 0 12 5.38 12 12s-5.38 12-12 12z"></path>
            </svg>{" "}
            {user && (
              <h3 className="font-medium ">{user.city}</h3>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-indigoDay rounded-[20px]  p-2 ">
          <div className="bg-bodyWhite dark:bg-[#1c2e50] rounded-[20px] flex justify-between p-4">
            <div className="flex flex-col ">
              <h3 className="text-center font-bold">
                {myCourses.length !== 0 ? myCourses.length : "0"}
              </h3>
              <p className="text-center mx-2 font-bold">{t("Courses")}</p>
            </div>
            <div className="flex flex-col ">
              <h3 className="text-center font-bold">
                {user.FOLLOWERS.length !== 0 ? user.FOLLOWERS.length : "0"}
              </h3>
              <p className="text-center mx-2 font-bold">{t("Followers")}</p>
            </div>
            <div className="flex flex-col ">
              <h3 className="text-center font-bold">
                {user.FOLLOWING.length !== 0 ? user.FOLLOWING.length : "0"}
              </h3>
              <p className="text-center mx-2 font-bold">{t("Following")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendHeader;
