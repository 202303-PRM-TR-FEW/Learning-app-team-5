import React from "react";

function CourseButton({ buttonName, handleClick }) {
  return (
    <button
      className="bg-[#56a0fe] w-[45%] rounded-2xl text-white py-2 px-4 hover:bg-[#fbfbfb] hover:text-[#56a0fe] hover:border-[#56a0fe] hover:border-2 text-base"
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
}

export default CourseButton;
