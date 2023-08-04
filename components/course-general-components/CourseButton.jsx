import React from "react";

function CourseButton({ 
  buttonName = "Button", 
  handleClick = () => {}, 
  widthPercentage="w-[45%]" 
}) {
  return (
    <button
      className={`bg-[#56a0fe] w-[${widthPercentage}%] rounded-2xl text-white py-2 px-4 hover:bg-[#fbfbfb] hover:text-[#56a0fe] hover:border-[#56a0fe] hover:border-2 text-base cursor-pointer`}
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
}

CourseButton.defaultProps = {
  buttonName: "Button",
  handleClick: () => {},
  widthPercentage: "w-[45%]",
};

export default CourseButton;
