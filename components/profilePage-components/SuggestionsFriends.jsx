"use client";

import React, { useMemo, useState } from "react";
import { doc, writeBatch, arrayUnion } from "firebase/firestore";
import { FriendSugCard } from "./SuggestionCard";
import { GetAllUsers } from "@/app/context/FetchAllUsers";
import { GetRandomNumbers } from "@/app/context/RandomNumbers";
import { UserAuth } from "@/app/context/AuthContext";
import { db } from "@/firebase";

const SuggestionsFriends = ({ t, setRefrash }) => {
  const { users } = GetAllUsers();
  const { user } = UserAuth();
  const { getRandomNumbers } = GetRandomNumbers();

  const [newUsers, setNewUsers] = useState([]);
  const [message, setMessage] = useState(null);

  const AllSuggestions = useMemo(() => {
    const Allusers = users.filter((friend) => friend.id !== user.uid);
    return Allusers.slice(0, 10);
  }, [users, user.uid]);

  const handleDeleteSuggestion = (id) => {
    if (newUsers.length > 1) {
      setNewUsers(newUsers.filter((user) => user.id !== id));
    } else {
      setNewUsers(AllSuggestions.filter((user) => user.id !== id));
    }
  };

  //toggal view or hide states
  const [showAll, setShowAll] = useState(false);

  // useMemo hook to set the initial two random users
  const randomTwoUsers = useMemo(() => {
    return getRandomNumbers(newUsers.length > 1 ? newUsers : AllSuggestions, 2);
  }, [newUsers, AllSuggestions]);

  const handleAddFriend = async (ID) => {
    const addedUserRef = doc(db, "users", ID);
    const currentUserRef = doc(db, "users", user.uid);

    const batch = writeBatch(db);

    //update the friend followers array
    batch.update(addedUserRef, { FOLLOWERS: arrayUnion(user.uid) });

    //update the current user following array
    batch.update(currentUserRef, { FOLLOWING: arrayUnion(ID) });

    await batch.commit();
    setMessage(t("Message"));
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  return (
    <section>
      <h2 className="font-bold text-xl py-4">{t("title-3")}</h2>
      <div
        className={`bg-white dark:bg-indigoDay rounded-xl shadow-lg ${
          showAll ? `overflow-auto h-60` : ``
        }`}
      >
        {showAll
          ? //check if newUsers array is not empty, and render the users from it, if not just render from the users array
            (newUsers.length > 1 ? newUsers : AllSuggestions).map((friend) => {
              return (
                <FriendSugCard
                  key={friend.id}
                  friend={friend}
                  click={handleDeleteSuggestion}
                  Add={handleAddFriend}
                />
              );
            })
          : randomTwoUsers.map((friend) => (
              <FriendSugCard
                key={friend.id}
                friend={friend}
                click={handleDeleteSuggestion}
                Add={handleAddFriend}
              />
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

//this function create a friend suggestion card to render it in the above SuggestionsFriends function based on user's data

export default SuggestionsFriends;
