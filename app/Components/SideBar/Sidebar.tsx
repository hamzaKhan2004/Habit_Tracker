import React, { useEffect, useRef } from "react";
import LogoAnName from "../LogoAnName";
import MenuSelection from "./MenuSelection";
import LogoutSection from "./LogoutSection";
import { useGlobalContextProivder } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";

function Sidebar() {
  const { openSideBarObject, darkModeObject } = useGlobalContextProivder();
  const { openSideBar, setOpenSideBar } = openSideBarObject;
  const { isDarkMode } = darkModeObject;
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClicked(event: MouseEvent) {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setOpenSideBar(false);
      }
    }

    if (openSideBar) {
      document.addEventListener("click", handleOutsideClicked);
    } else {
      document.removeEventListener("click", handleOutsideClicked);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClicked);
    };
  }, [openSideBar]); // Runs only when `openSideBar` changes

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      ref={sideBarRef}
      className={` ${
        !openSideBar ? "max-xl:hidden" : "fixed shadow-lg"
      } flex-grow z-50 p-10 flex flex-col gap-20 bg-white transition-all`}
    >
      <LogoAnName />
      <MenuSelection />
      <LogoutSection />
    </div>
  );
}

export default Sidebar;
