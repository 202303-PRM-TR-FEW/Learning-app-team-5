"use client";

import { useEffect, useState, useTransition } from "react";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { GetAllUsers } from "@/app/context/FetchAllUsers";
import { UserAuth } from "@/app/context/AuthContext";
import { db } from "@/firebase";

const SuggestionsFriends = ({ t }) => {
  const { users } = GetAllUsers();
  const { user } = UserAuth();
  const [myFriends, setMyFriends] = useState([]);
  const [following, setFollowing] = useState([]);

  const showFriends = async () => {
    const followingArray = await getFollowingArray(user.uid);
    setFollowing(followingArray);
    setMyFriends(users.filter((friend) => followingArray.includes(friend.id)));
  };

  const getFollowingArray = async (userId) => {
    const userDoc = doc(db, "users", userId);
    const followingArraySnapShot = await getDoc(userDoc);
    const followingArray = followingArraySnapShot.data().FOLLOWING;
    return followingArray;
  };

  useEffect(() => {
    showFriends();
  }, []);
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
          ? myFriends.map((user, index) => {
              return <FriendSugCard key={index} user={user} />;
            })
          : myFriends
              .slice(0, 2)
              .map((user, index) => (
                <FriendSugCard key={index} user={user} t={t} />
              ))}
        {following.length > 2 && (
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

  const t = useTransition("profile");
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
          <p className=" p-2 text-primaryBlue font-bold cursor-pointer hover:text-blue-200">
            {/* {t("Profile")} */}
          </p>
        </div>
      </div>
      <hr className="w-[90%] m-auto" />
    </div>
  );
};

export default SuggestionsFriends;
