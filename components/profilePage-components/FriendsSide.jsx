"use client";
import { useTranslations } from "next-intl";
import SuggestionsFriends from "./SuggestionsFriends";
import Friends from "./Friends";

// I splited the page into two sections
const FriendsComp = ({ lang }) => {
  // this for check if the language is English or not. I need it for styling
  const isEnglish = lang === "en";

  const t = useTranslations("Profile");

  return (
    <div className="flex flex-col  w-full lg:w-1/2 ">
      {/* Each section has its own componentes which they are inside profilePage component folder */}
      <SuggestionsFriends t={t} />
      <Friends t={t} />
      <div className="flex w-full py-8 justify-between">
        <button
          className={`font-bold text-primaryBlue border border-primaryBlue rounded-[15px] hover:bg-primaryBlue hover:text-white hover:border-2 hover:border-primaryBlue ${
            isEnglish ? "px-20" : "px-16"
          } py-3 `}
        >
          {t("Find")}
        </button>
        <button
          className={`font-bold text-white bg-primaryBlue border border-primaryBlue rounded-[15px] hover:text-primaryBlue hover:border-2 hover:bg-[#F5F5F5] ${
            isEnglish ? "px-20" : "px-10"
          }`}
        >
          {t("Invite")}
        </button>
      </div>
    </div>
  );
};

export default FriendsComp;
