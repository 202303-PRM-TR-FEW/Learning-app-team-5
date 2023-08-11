import { useEffect, useState } from "react";

const useScreenType = () => {
  const [screenType, setScreenType] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 600; // Adjust the breakpoint as needed
      setScreenType(isMobile ? "mobile" : "desktop");
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenType;
};

export default useScreenType;
