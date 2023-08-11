"use client";
import FriendsComp from "@/components/profilePage-components/FriendsSide";
import InfoComp from "@/components/profilePage-components/InfoSide";
import { UserAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";

function Profile({ params }) {
  const { user, userData } = UserAuth();
  const [language, setLanguage] = useState(params.locale);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  return (
    <>
      {user ? (
        userData ? (
          <div className="flex flex-col container mx-auto px-4 min-h-screen md:flex-row md:gap-20  lg:max-w-[1280px] text-lightBlack dark:text-bodyWhite">
            <InfoComp
              user={user}
              userData={userData}
              followers={followers}
              following={following}
            />
            <FriendsComp
              lang={params.locale}
              setFollowers={setFollowers}
              setFollowing={setFollowing}
              following={following}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Spinner className="h-14 w-14" />
          </div>
        )
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
