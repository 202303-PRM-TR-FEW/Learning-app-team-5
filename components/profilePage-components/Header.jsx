import Image from "next/image";
import { doc, updateDoc } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { UserAuth } from "../../app/context/AuthContext";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = ({ user, userData, setShowForm }) => {
  const [Form, setForm] = useState(null);
  const [newCity, setNewCity] = useState("");
  const t = useTranslations("Profile");
  const { logOut } = UserAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await logOut();
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCity = () => {
    setForm(true);
  };

  const handleSubmitCity = (e) => {
    e.preventDefault();
    updateCity(user.uid, newCity);
  };
  async function updateCity(userId, newCity) {
    const userRef = doc(db, "users", userId);

    // Update the 'city' field of the user
    await updateDoc(userRef, { city: newCity });
    setShowForm(null);
  }

  return (
    <div className="flex flex-col md:flex-row w-full  gap-2 items-center">
      <div className="flex justify-center self-center w-1/3">
        <Image
          onClick={() => setShowForm(true)}
          className="rounded-full  m-2 cursor-pointer"
          src={
            user.photoURL
              ? user.photoURL
              : "https://icon-library.com/images/new-account-icon/new-account-icon-14.jpg"
          }
          alt="profile image"
          height={150}
          width={150}
        />
      </div>
      <div className="flex flex-col gap-2 shadow-sm w-full">
        <div className="flex justify-between">
          <h1 className="font-extrabold text-2xl">{user.displayName}</h1>
          <button
            className="bg-primaryBlue text-white py-2 px-6 rounded-[10px] hover:bg-white hover:text-primaryBlue hover:border hover:border-primaryBlue dark:hover:bg-[#1c2e50]"
            onClick={handleLogOut}
          >
            {t("Log")}
          </button>
        </div>
        <div className="flex justify-start items-center text-[#616161] dark:text-bodyWhite">
          {"  "}
          <svg
            viewBox="0 0 288 512"
            className="w-[16px] h-[16px]"
            style={{ fill: "#616161" }}
          >
            <path d="M112 316.94v156.69l22.02 33.02c4.75 7.12 15.22 7.12 19.97 0L176 473.63V316.94c-10.39 1.92-21.06 3.06-32 3.06s-21.61-1.14-32-3.06zM144 0C64.47 0 0 64.47 0 144s64.47 144 144 144 144-64.47 144-144S223.53 0 144 0zm0 76c-37.5 0-68 30.5-68 68 0 6.62-5.38 12-12 12s-12-5.38-12-12c0-50.73 41.28-92 92-92 6.62 0 12 5.38 12 12s-5.38 12-12 12z"></path>
          </svg>{" "}
          {userData && (
            <h3
              onClick={handleChangeCity}
              className="font-medium cursor-pointer"
            >
              {userData.city}
            </h3>
          )}
        </div>
        {Form && (
          <form
            onSubmit={handleSubmitCity}
            className=" py-4 flex flex-col justify-center items-center gap-4 
            absolute top-[30%] left-[21%] md:top-[30%] md:left-[80%] z-1
           bg-white dark:bg-indigoDay rounded-[25px] shadow-2xl w-60"
          >
            <p
              className="self-end px-3 hover:text-red-200 cursor-pointer"
              onClick={() => setForm(false)}
            >
              X
            </p>
            <label>{t("Input")}</label>
            <input
              type="text"
              value={newCity}
              className="
              w-[80%]
            bg-bodyWhite
            px-6 py-1 m-3
            border-none
            rounded-xl
            text-lightBlack
            cursor-pointer
            shadow-lg shadow-blue-600/50
            "
              onChange={(e) => setNewCity(e.target.value)}
            />
            <button
              type="submit"
              className="py-2 px-4 bg-gradient-to-b from-blue-400 to-primaryBlue
             text-white rounded-xl 
             shadow-lg shadow-blue-600/50
             "
            >
              {t("Submit")}
            </button>
          </form>
        )}
        <div className="bg-white dark:bg-indigoDay rounded-[20px]  p-2 ">
          <div className="bg-bodyWhite dark:bg-[#1c2e50] rounded-[20px] flex justify-between p-4">
            <div className="flex flex-col ">
              <h3 className="text-center font-bold">0</h3>
              <p className="text-center mx-2 font-bold">{t("Courses")}</p>
            </div>
            <div className="flex flex-col ">
              <h3 className="text-center font-bold">0</h3>
              <p className="text-center mx-2 font-bold">{t("Followers")}</p>
            </div>
            <div className="flex flex-col ">
              <h3 className="text-center font-bold">0</h3>
              <p className="text-center mx-2 font-bold">{t("Following")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
