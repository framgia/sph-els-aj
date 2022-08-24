import { useEffect } from "react";

const useWindowSize = (setDrawerState) => {
  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 800 ? setDrawerState(false) : setDrawerState(true);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};

export default useWindowSize;
