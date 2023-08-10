import React from "react";

function CourseButton({ buttonName, handleClick }) {
  return (
    <button
      className="bg-primaryBlue w-[45%] rounded-2xl text-white py-2 px-4 hover:bg-white hover:text-primaryBlue hover:border-primaryBlue hover:border-2 text-base dark:hover:bg-indigoDay"
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
}

export default CourseButton;