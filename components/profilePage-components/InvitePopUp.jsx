import React, { useState } from "react";
import { usePopper } from "react-popper";
import { faceBook, telegeram, twitter } from "../../public/social-media/index";
import SocialMedia from "./socialMedia-buttons";

function InvitePopUp({ showInvite, setShowInvite, referenceElement }) {
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });

  const handleInvite = (provider) => {
    const APP_URL = "https://learning-app-team-5.vercel.app/";
    const message = `&text=${encodeURIComponent(
      "Learn with us in Learn U app"
    )}`;
    let url = "";
    if (provider === "facebook") {
      url = `https://www.facebook.com/sharer.php?u=${APP_URL}${message}`;
    } else if (provider === "twitter") {
      url = `https://twitter.com/intent/tweet?url=${APP_URL}${message}`;
    } else {
      url = `https://t.me/share/url?url=${APP_URL}${message}`;
    }
    window.open(url, "_blank", "width=1200,height=600");
  };

  const ICONS = [
    { name: "facebook", image: faceBook },
    { name: "twitter", image: twitter },
    { name: "telegram", image: telegeram },
  ];
  return (
    <>
      {showInvite && (
        <div
          className="bg-white rounded-xl w-64 h-12 p-1 my-2 drop-shadow-lg  transition-all transform translate-y-4 flex justify-around items-center"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {ICONS.map((icon) => (
            <div
              key={icon.name}
              className="flex flex-col items-center justify-center"
            >
              <SocialMedia
                src={icon.image}
                alt={icon.name}
                provider={icon.name}
                handleInvite={handleInvite}
              />
            </div>
          ))}

          {/* //style={styles.arrow} */}
          <div ref={setArrowElement} />
          <button
            className="text-black ml-2 text-xl cursor-pointer"
            onClick={() => setShowInvite(false)}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}

export default InvitePopUp;
