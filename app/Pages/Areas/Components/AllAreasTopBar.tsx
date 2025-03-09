/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGlobalContextProivder } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/Button";
import React from "react";

function AllAreasTopBar() {
  const {
    openSideBarObject,
    darkModeObject: { isDarkMode },
    openAreaFormObject: { openAreaForm, setOpenAreaForm },
  } = useGlobalContextProivder();
  const { setOpenSideBar } = openSideBarObject;
  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className="p-5 rounded-md flex justify-between items-center transition-all"
    >
      <div className="flex gap-5 items-center">
        <span className="text-xl font-bold">Areas</span>
        <Button
          style={{ backgroundColor: defaultColor.default }}
          className="text-white p-2 px-4 ml-3"
          size="small"
          icon="plus"
          onClick={() => setOpenAreaForm(true)}
        >
          Add Area
        </Button>
      </div>
      <FontAwesomeIcon
        onClick={() => setOpenSideBar(true)}
        className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer"
        icon={faBars}
      />
    </div>
  );
}

export default AllAreasTopBar;
