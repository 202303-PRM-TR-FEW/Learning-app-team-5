"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { app, db } from "@/firebase";
import Achievemntes from "./Achievemntes";
import Header from "./Header";
import TotalStatistics from "@/components/profilePage-components/TotalStatistics";

const InfoComp = ({ user, userData }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const t = useTranslations("Profile");

  const storage = getStorage(app);

  const uploadFileAndGetURL = async (file) => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
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
  console.log(user.uid);
  const handleSubmitImage = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const photoURL = await uploadFileAndGetURL(selectedFile);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { photoURL: photoURL });
    }
    setShowForm(false);
    setProgress(null);
  };

  return (
    <div className="w-full lg:w-1/2 relative ">
      <Header setShowForm={setShowForm} user={user} userData={userData} t={t} />

      {showForm && (
        <form
          onSubmit={handleSubmitImage}
          className=" py-4 flex flex-col justify-center items-center gap-4 
            absolute top-[30%] left-[5%] md:top-[30%] md:left-[80%] 
           bg-white dark:bg-indigoDay rounded-[25px] shadow-2xl"
        >
          <p
            className="self-end px-3 hover:text-red-200 cursor-pointer"
            onClick={() => setShowForm(false)}
          >
            X
          </p>
          {selectedFile && (
            <div className="bg-gray-200 rounded-full h-3 w-[90%] mx-auto mt-2">
              <div
                className="bg-gradient-to-r from-blue-200 to-blue-600 h-full rounded-full"
                style={{ width: `${progress}%`, transition: "width 1s" }}
              ></div>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
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
