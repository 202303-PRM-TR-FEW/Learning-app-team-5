"use client";
import FriendsComp from "@/components/profilePage-components/FriendsSide";
import InfoComp from "@/components/profilePage-components/InfoSide";
import { UserAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

function Profile({ params }) {
  const { user } = UserAuth();
  const [language, setLanguage] = useState(params.locale);

  return (
    <>
      {user ? (
        <div
          className="flex flex-col container mx-auto px-4 min-h-screen md:flex-row md:gap-20  
     max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1350px] text-lightBlack dark:text-bodyWhite"
        >
          <InfoComp user = {user} />
          <FriendsComp lang={params.locale} />
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center font-bold text-xl md:text-2xl dark:text-bodyWhite ">
          <div className="w-[90%] md:w-[50%] m-x-auto bg-white dark:bg-indigoDay rounded-[20px] text-center">
            {language === "en" ? (
              <p className="px-4 py-2 md:p-8">
                Please{" "}
                <Link
                  href="./login"
                  className="text-primaryBlue underline underline-offset-3 hover:text-blue-700"
                >
                  Sign In
                </Link>{" "}
                first to see your profile
              </p>
            ) : (
              <p className="px-4 py-2 md:p-8">
                Profilinizi görmek için lütfen önce{" "}
                <Link
                  href="./login"
                  className="text-primaryBlue underline underline-offset-3 hover:text-blue-700"
                >
                  Giriş
                </Link>{" "}
                Yapın
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
