"use client";

import React, { useEffect, useState } from "react";
import { GetRandomNumbers } from "../../app/context/RandomNumbers";

//list of users we will replace it with firebase data
const users = [
  {
    image: "https://loremflickr.com/640/480/girls",
    name: "Laura Evaes",
    id: 1,
  },
  {
    image: "https://loremflickr.com/640/480/girls",
    name: "Anna Clarke",
    id: 2,
  },
  {
    image: "https://loremflickr.com/640/480/girls",
    name: "Sally Willy",
    id: 3,
  },
  {
    image: "https://loremflickr.com/640/480/man",
    name: "William Walker",
    id: 4,
  },
  {
    image: "https://loremflickr.com/640/480/man",
    name: "Alexender Thohmpson",
    id: 5,
  },
  {
    image: "https://loremflickr.com/640/480/girls",
    name: "Sarah loury",
    id: 6,
  },
];

const SuggestionsFriends = () => {
  const { getRandomNumbers } = GetRandomNumbers();

  const [newUsers, setNewUsers] = useState([]);

  const handleDeleteSuggestion = (id) => {
    if (newUsers.length > 1) {
      setNewUsers(newUsers.filter((user) => user.id !== id));
    } else {
      setNewUsers(users.filter((user) => user.id !== id));
    }
  };

  const [randomTwoUsers, setRandomTwoUsers] = useState([]);
  //toggal view or hide states
  const [showAll, setShowAll] = useState(false);

  // useEffect hook to set the initial two random users
  useEffect(() => {
    setRandomTwoUsers(
      //check if newUsers array not empty take the two suggestion from it
      getRandomNumbers(newUsers.length > 1 ? newUsers : users, 2)
    );
  }, [newUsers]);

  return (
    <section>
      <h2 className="font-bold text-xl py-4">Friend Suggestions</h2>
      <div
        className={`bg-white dark:bg-indigoDay rounded-xl shadow-lg ${
          showAll ? `overflow-auto h-60` : ``
        }`}
      >
        {showAll
          ? //check if newUsers array is not empty, and render the users from it, if not just render from the users array
            (newUsers.length > 1 ? newUsers : users).map((user, index) => {
              return (
                <FriendSugCard
                  key={index}
                  user={user}
                  click={handleDeleteSuggestion}
                />
              );
            })
          : randomTwoUsers.map((user, index) => (
              <FriendSugCard
                key={index}
                user={user}
                click={handleDeleteSuggestion}
              />
            ))}
        <p
          onClick={() => setShowAll((pre) => !pre)}
          className="py-4 px-6 font-bold text-primaryBlue cursor-pointer"
        >
          {showAll ? "Hide" : "VIEW ALL"}
        </p>
      </div>
    </section>
  );
};
//this function create a friend suggestion card to render it in the above SuggestionsFriends function based on user's data
const FriendSugCard = ({ user, click }) => {
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
          <button className="text-white py-1 px-2 bg-primaryBlue rounded-[5px] hover:bg-blue-200">
            +
          </button>
          <div
            onClick={() => click(user.id)}
            className="flex justify-center items-center cursor-pointer"
          >
            <svg
              viewBox="0 0 24 20"
              className="w-[24px] h-[24px] svg-hover"
              // style={{ fill: "#FE9E23" }}
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </div>
        </div>
      </div>
      <hr className="w-[90%] m-auto" />
    </div>
  );
};

export default SuggestionsFriends;
