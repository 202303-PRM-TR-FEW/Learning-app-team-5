"use client";
import { useState } from "react";
import Link from "next-intl/link";
import TranslateIcon from "@mui/icons-material/Translate";

const SelectLanguage = ({ lang }) => {
  const [language, setLanguage] = useState(lang);

  return (
    <div className="flex justify-end">
      {language === "en" ? (
        <Link
          href="/"
          locale="tr"
          className="flex items-center
           hover:text-primaryBlue hover:fill-primaryBlue 
           text-[#413F42] fill-[#413F42]"
          onClick={() => setIsEnglish((pre) => !pre)}
        >
          <TranslateIcon className="hover:fill-primaryBlue " />
          <button className="font-bold text-lg pl-3  hover:text-primaryBlue">
            English
          </button>
        </Link>
      ) : (
        <Link
          href="/"
          locale="en"
          className="flex items-center
           hover:text-primaryBlue hover:fill-primaryBlue 
           text-[#413F42] fill-[#413F42] "
          onClick={() => setIsEnglish((pre) => !pre)}
        >
          <TranslateIcon className="hover:fill-primaryBlue " />
          <button className="font-bold text-lg pl-3  hover:text-primaryBlue">
            Türkçe
          </button>
        </Link>
      )}
    </div>
  );
};

export default SelectLanguage;
