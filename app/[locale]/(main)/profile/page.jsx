import FriendsComp from "@/components/profilePage-components/FriendsSide";
import InfoComp from "@/components/profilePage-components/InfoSide";

function Profile({ params }) {
  
  return (
    <div
      className="flex flex-col container mx-auto px-4 min-h-screen md:flex-row gap-20 
     max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1350px] text-lightBlack dark:text-bodyWhite"
    >
      <InfoComp />
      <FriendsComp lang={params.locale} />
    </div>
  );
}

export default Profile;
