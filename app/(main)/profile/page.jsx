import FriendsComp from "@/components/profilePage-components/FriendsSide";
import InfoComp from "@/components/profilePage-components/InfoSide";

function Profile() {
  return (
    <div
      className="flex flex-col container mx-auto px-4 bg-[#F5F5F5] md:flex-row gap-20 
     max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1370px] 3xl:max-w-[1750px]"
    >
      <InfoComp />
      <FriendsComp />
    </div>
  );
}

export default Profile;