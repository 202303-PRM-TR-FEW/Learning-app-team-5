"use client";
import { useTranslations } from "next-intl";
import SuggestionsFriends from "./SuggestionsFriends";
import Friends from "./Friends";

// I splited the page into two sections
const FriendsComp = ({ lang, setFollowers, setFollowing, following }) => {
  // this for check if the language is English or not. I need it for styling
  const isEnglish = lang === "en";

  const t = useTranslations("Profile");

  return (
    <div className="flex flex-col  w-full lg:w-1/2 ">
      {/* Each section has its own componentes which they are inside profilePage component folder */}
      <SuggestionsFriends t={t} following={following} />
      <Friends
        t={t}
        setFollowers={setFollowers}
        setFollowing={setFollowing}
        following={following}
      />
      <div className="flex flex-col md:flex-row w-full pt-8 pb-20 md:py-8 justify-between">
        <button
          className={`font-bold text-primaryBlue border border-primaryBlue rounded-[15px] hover:bg-primaryBlue hover:text-white hover:border-2 hover:border-primaryBlue ${
            isEnglish ? "px-14" : "px-16"
          } py-3 my-5 md:my-0`}
        >
          {t("Find")}
        </button>
        <button
          className={`font-bold text-white bg-primaryBlue border border-primaryBlue rounded-[15px] hover:text-primaryBlue hover:border-2 hover:bg-[#F5F5F5] dark:hover:bg-[#121d34] ${
            isEnglish ? "px-14" : "px-10"
          } py-3`}
        >
          {t("Invite")}
        </button>
      </div>
    </div>
  );
};

export default FriendsComp;
