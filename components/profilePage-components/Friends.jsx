"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

//list of users we will replace it with firebase data
const users = [
  {
    image: "https://loremflickr.com/640/480/girls",
    name: "Jusica lorens",
  },
  {
    image: "https://loremflickr.com/640/480/girls",
    name: "Emaly Deron",
  },
  {
    image: "https://loremflickr.com/640/480/girls",
    name: "jane Thompson",
  },
  {
    image: "https://loremflickr.com/640/480/man",
    name: "jone Walker",
  },
  {
    image: "https://loremflickr.com/640/480/man",
    name: "Alexender Davis",
  },
  {
    image: "https://loremflickr.com/640/480/girls",
    name: "Sophia loury",
  },
];

const SuggestionsFriends = ({ t }) => {
  //toggal view or hide states
  const [showAll, setShowAll] = useState(false);

  return (
    <section>
      <h2 className="font-bold text-xl py-4">{t("title-4")}</h2>
      <div
        className={`bg-white dark:bg-indigoDay rounded-xl shadow-lg ${
          showAll ? `overflow-auto h-60` : ``
        }`}
      >
        {showAll
          ? users.map((user, index) => {
              return <FriendSugCard key={index} user={user} />;
            })
          : users
              .slice(0, 2)
              .map((user, index) => (
                <FriendSugCard key={index} user={user} t={t} />
              ))}
        <p
          onClick={() => setShowAll((pre) => !pre)}
          className="py-4 px-6 font-bold text-primaryBlue cursor-pointer"
        >
          {showAll ? t("Hide") : t("View")}
        </p>
      </div>
    </section>
  );
};

const FriendSugCard = ({ user }) => {
  const t = useTranslations("Profile");
  return (
    <div>
      <div className="flex justify-between items-center py-3 px-6 ">
        <div className="flex justify-between gap-4 ">
          <img
            className="rounded-full h-14 w-14"
            src={user.image}
            alt="profile image"
          />
          <h3 className="font-medium self-center">{user.name}</h3>
        </div>
        <div className="flex justify-between gap-2">
          <p className=" p-2 text-primaryBlue font-bold cursor-pointer hover:text-blue-200">
            {t("Profile")}
          </p>
        </div>
      </div>
      <hr className="w-[90%] m-auto" />
    </div>
  );
};

export default SuggestionsFriends;
