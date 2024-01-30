import React, { useEffect, useState } from "react";

type BreakPoint = "sm" | "md" | "lg" | "xl" | "2xl";
const getBreakpoint = (width: number) => {
  if (width < 640) {
    return "sm";
  } else if (width < 768) {
    return "md";
  } else if (width < 1024) {
    return "lg";
  } else if (width < 1280) {
    return "xl";
  } else {
    return "2xl";
  }
};

const useBreakPoint = () => {
  const [breakpoint, setBreakpoint] = useState<BreakPoint>(
    getBreakpoint(window.innerWidth)
  );

  const handleResize = () => {
    setBreakpoint(getBreakpoint(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return breakpoint;
};

export default useBreakPoint;
