import React, { useState } from "react";
import { usePopper } from "react-popper";
import RatingStars from "./RatingStars";

function DropUpMenu({ buttonName, handleClick }) {
  
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "top",
      modifiers: [{ name: "arrow", options: { element: arrowElement } }],
    }
  );

  const handleButtonClick = () => {
    if (handleClick) {
      handleClick();
    }
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button
        ref={setReferenceElement}
        className="bg-primaryBlue w-[45%] rounded-2xl text-white py-2 px-4 hover:bg-white hover:text-primaryBlue hover:border-primaryBlue hover:border-2 text-base dark:hover:bg-indigoDay"
        onClick={handleButtonClick}
      >
        {buttonName}
      </button>

      {showPopup && (
        <div
          className="bg-white rounded-xl w-60 h-12 p-1 mb-2 drop-shadow-lg  flex justify-around"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <RatingStars className="p-2 mt-2"/>
          <div ref={setArrowElement} style={styles.arrow} />
          <button className="text-black ml-2 text-xl" onClick={handlePopupClose}>&times;</button>
        </div>
      )}
    </>
  );
}

export default DropUpMenu;
