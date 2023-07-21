import FriendsComp from "@/components/profilePage-components/FriendsSide";
import InfoComp from "@/components/profilePage-components/InfoSide";

function Profile() {
  return (
    <div className="flex flex-col container mx-auto px-4  max-w-screen-2xl bg-[#F5F5F5] md:flex-row gap-20">
      <InfoComp />
      <FriendsComp />
    </div>
  );
}

export default Profile;
