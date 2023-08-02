"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { app } from "@/firebase";
import Achievemntes from "./Achievemntes";
import Header from "./Header";
import TotalStatistics from "@/components/profilePage-components/TotalStatistics";

const InfoComp = ({ user, userData }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const t = useTranslations("Profile");

  const storage = getStorage(app);

   const uploadFileAndGetURL = async (file) => {
     const storageRef = ref(storage, file.name);
     const uploadTask = uploadBytesResumable(storageRef, file);

     return new Promise((resolve, reject) => {
       uploadTask.on(
         "state_changed",
         (snapshot) => {
           // Handle the upload task progress here if needed
         },
         (error) => {
           // Handle unsuccessful uploads
           reject(error);
         },
         () => {
           // Handle successful uploads on complete
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             resolve(downloadURL);
           });
         }
       );
     });
   };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const photoURL = await uploadFileAndGetURL(selectedFile);
      await updateProfile(user, { photoURL });
    }
    setShowForm(false);
  };

  return (
    <div className="w-full lg:w-1/2 relative ">
      <Header setShowForm={setShowForm} user={user} userData={userData} t={t} />
      {showForm && (
        <form
          onSubmit={handleSubmitImage}
          className=" py-4 flex flex-col justify-center items-center gap-4 
            absolute top-[30%] left-[5%] md:top-[30%] md:left-[80%] z-1
           bg-white dark:bg-indigoDay rounded-[25px] shadow-2xl"
        >
          <input
            type="file"
            accept="image/*"
            // value={image}
            className="
            file:bg-gradient-to-b file:from-blue-400 file:to-primaryBlue
            file:px-6 file:py-3 file:m-5
            file:border-none
            file:rounded-xl
            file:text-white
            file:cursor-pointer
            file:shadow-lg file:shadow-blue-600/50
            "
            onChange={(e) => handleFileChange(e)}
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
      <TotalStatistics t={t} />
      <Achievemntes t={t} />
    </div>
  );
};

export default InfoComp;
