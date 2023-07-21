import SuggestionsFriends from "./SuggestionsFriends";
import Friends from "./Friends";

const FriendsComp = () => {
  // I splited the page into two sections

  return (
    <div className="flex flex-col text-lightBlack w-full lg:w-1/2 ">
      {/* Each section has its own componentes which they are inside profilePage component folder */}
      <SuggestionsFriends />
      <Friends />
      <div className="flex w-full py-8 justify-between">
        <button className="font-bold text-primaryBlue px-20 py-3 border border-primaryBlue rounded-[15px] hover:bg-primaryBlue hover:text-white">
          FIND FRIENDS
        </button>
        <button className="font-bold text-white bg-primaryBlue px-20 py-3 border border-primaryBlue rounded-[15px] hover:text-primaryBlue hover:border hover:bg-[#F5F5F5]">
          INVITE FRIENDS
        </button>
      </div>
    </div>
  );
};

export default FriendsComp;
