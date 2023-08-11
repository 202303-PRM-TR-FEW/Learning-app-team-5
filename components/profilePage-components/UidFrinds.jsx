"use client";

import { useEffect, useState } from "react";
import { GetAllUsers } from "@/app/context/FetchAllUsers";
import { useTranslations } from "next-intl";
import Link from "next/link";

const UidFriends = ({ t, friend }) => {
  const { users } = GetAllUsers();
  const [myFriends, setMyFriends] = useState([]);

  useEffect(() => {
    setMyFriends(users.filter((u) => friend.FOLLOWING?.includes(u.id)));
  }, []);
  //toggal view or hide states
  const [showAll, setShowAll] = useState(false);

  return (
    <section >
      <h2 className="font-bold text-xl py-4">{`${friend.username} ${t(
        "title-4"
      )}`}</h2>
      <div
        className={`bg-white dark:bg-indigoDay rounded-xl shadow-lg ${
          showAll ? `overflow-auto h-60` : ``
        }`}
      >
        {showAll
          ? myFriends.map((user, index) => {
              return <FriendSugCard key={index} user={user} />;
            })
          : myFriends
              .slice(0, 2)
              .map((user, index) => (
                <FriendSugCard key={index} user={user} t={t} />
              ))}
        {friend.FOLLOWING?.length > 2 && (
          <p
            onClick={() => setShowAll((pre) => !pre)}
            className="py-4 px-6 font-bold text-primaryBlue cursor-pointer"
          >
            {showAll ? t("Hide") : t("View")}
          </p>
        )}
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
            src={user.photoURL}
            alt="profile image"
          />
          <h3 className="font-medium self-center">{user.username}</h3>
        </div>
        <div className="flex justify-between gap-2">
          <Link href={`/profile/${user.id}`}>
            <p className=" p-2 text-primaryBlue font-bold cursor-pointer hover:text-blue-200">
              {t("Profile")}
            </p>
          </Link>
        </div>
      </div>
      <hr className="w-[90%] m-auto" />
    </div>
  );
};

export default UidFriends;
