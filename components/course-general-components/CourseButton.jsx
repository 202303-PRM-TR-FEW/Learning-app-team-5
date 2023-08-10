import React from "react";

function CourseButton({ buttonName, handleClick }) {
  return (
    <button
      
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
}

export default CourseButton;
