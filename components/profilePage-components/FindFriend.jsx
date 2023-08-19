import { useState } from "react";
import { useTranslations } from "next-intl";
import { GetAllUsers } from "@/app/context/FetchAllUsers";
import Link from "next/link";

const FindFriend = ({ following }) => {
  const { users } = GetAllUsers();
  const t = useTranslations("Profile");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  const userFriends = users.filter((user) => following.includes(user?.id));

  const handleSearch = (target) => {
    setSearch(target);
    const filterdFriend = userFriends.filter((friend) =>
      friend.username.toLowerCase().includes(search)
    );
    setResult(filterdFriend);
    if (target === "") {
      setResult(null);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder={`type friend's name....`}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className=" font-medium rounded-lg pl-3 pr-8 py-1.5 mr-2 mb-2 border border-gray-300 dark:bg-bodyWhite dark:text-lightBlack"
      />
      {result && (
        <>
          {result.map((user) => (
            <div
              className="bg-white dark:bg-indigoDay rounded-xl shadow-lg w-full my-2 mb-20 md:mb-0"
              key={user.id}
            >
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
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FindFriend;
