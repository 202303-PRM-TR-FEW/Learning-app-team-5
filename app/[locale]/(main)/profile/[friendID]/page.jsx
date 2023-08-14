"use client";
import { GetAllUsers } from "@/app/context/FetchAllUsers";
import FriendHeader from "@/components/profilePage-components/FriendHeader";
import { useMemo } from "react";
import { Spinner } from "@material-tailwind/react";
import TotalStatistics from "@/components/profilePage-components/TotalStatistics";
import { useTranslations } from "next-intl";
import UidFriends from "@/components/profilePage-components/UidFrinds";

const Page = ({ params }) => {
  const { users } = GetAllUsers();
  const t = useTranslations("Profile");

  const setUser = useMemo(() => {
    return users.find((user) => user.id === params.friendID);
  }, []);

  return setUser ? (
    <div className="flex flex-col container mx-auto px-4 min-h-screen md:flex-row md:gap-20  lg:max-w-[1280px] text-lightBlack dark:text-bodyWhite">
      <div className="w-full md:w-1/2">
        <FriendHeader user={setUser} />
        <TotalStatistics t={t} />
      </div>
      <div className="w-full md:1/2">
        <UidFriends t={t} friend={setUser} />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-14 w-14" />
    </div>
  );
};

export default Page;
