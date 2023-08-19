"use client";
import { useState } from "react";
import Link from "next-intl/link";
import TranslateIcon from "@mui/icons-material/Translate";

const SelectLanguage = ({ lang }) => {
  const [language, setLanguage] = useState(lang);

  return (
    <div className="flex justify-end py-4 md:py-0">
      {language === "en" ? (
        <Link
          href="/"
          locale="tr"
          className="flex items-center
           hover:text-primaryBlue hover:fill-primaryBlue 
           text-[#413F42] fill-[#413F42] dark:text-bodyWhite dark:fill-bodyWhite
           dark:hover:fill-primaryBlue dark:hover:text-primaryBlue"

        >
          <TranslateIcon className=" " />
          <button className="font-bold text-lg pl-3  ">English</button>
        </Link>
      ) : (
        <Link
          href="/"
          locale="en"
          className="flex items-center
           hover:text-primaryBlue hover:fill-primaryBlue 
           text-[#413F42] fill-[#413F42] dark:text-bodyWhite dark:fill-bodyWhite
           dark:hover:fill-primaryBlue dark:hover:text-primaryBlue"

        >
          <TranslateIcon className=" " />
          <button className="font-bold text-lg pl-3  ">Türkçe</button>
        </Link>
      )}
    </div>
  );
};

export default SelectLanguage;
