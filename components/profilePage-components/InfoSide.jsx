"use client";
import { useState } from "react";

import Achievemntes from "./Achievemntes";
import Header from "./Header";
import TotalStatistics from "@/components/profilePage-components/TotalStatistics";

const InfoComp = () => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState("");

  const handleSubmitImage = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  return (
    <div className="w-full lg:w-1/2 relative ">
      <Header setShowForm={setShowForm} />
      {showForm && (
        <form
          onSubmit={handleSubmitImage}
          className=" py-4 flex flex-col justify-center items-center gap-4 
            absolute top-[35%] left-[25%] md:top-[30%] md:left-[90%] z-1
           bg-white rounded-[20px] shadow-xl"
        >
          <input
            type="file"
            accept="image/*"
            value={image}
            className="
            file:bg-gradient-to-b file:from-blue-400 file:to-primaryBlue
            file:px-6 file:py-3 file:m-5
            file:border-none
            file:rounded-xl
            file:text-white
            file:cursor-pointer
            file:shadow-lg file:shadow-blue-600/50
            "
            onChange={(e) => setImage(e.target.value)}
          />
          <button
            type="submit"
            className="py-2 px-4 bg-gradient-to-b from-blue-400 to-primaryBlue
             text-white rounded-xl 
             shadow-lg shadow-blue-600/50
             "
          >
            submit
          </button>
        </form>
      )}
      <TotalStatistics />
      <Achievemntes />
    </div>
  );
};

export default InfoComp;
