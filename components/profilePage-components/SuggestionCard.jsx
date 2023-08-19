import React from "react";

const FriendSugCard = React.memo(({ friend, click, Add }) => {
  return (
    <div>
      <div className="flex justify-between items-center py-3 px-6 ">
        <div className="flex justify-between gap-4 ">
          <img
            className="rounded-full h-14 w-14"
            src={friend.photoURL}
            alt="profile image"
          />
          <h3 className="font-medium self-center">{friend.username}</h3>
        </div>
        <div className="flex justify-between gap-2">
          <button
            className="text-white py-1 px-2 bg-primaryBlue rounded-[5px] hover:bg-blue-200"
            onClick={() => Add(friend.id)}
          >
            +
          </button>
          <div
            onClick={() => click(friend.id)}
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
});
FriendSugCard.displayName = "FriendSugCard";

export { FriendSugCard };

