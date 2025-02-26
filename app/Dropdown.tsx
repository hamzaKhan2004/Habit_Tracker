import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContextProivder } from "./contextApi";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { darkModeColor, defaultColor } from "@/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface dropMenuItem {
  name: string;
  icon: IconProp;
}

function Dropdown() {
  const {
    darkModeObject,
    openDropDownObject,
    dropDownPositionsObject,
    openConfirmationWindowObject,
    selectedItemsObject,
    habitWindowObject,
  } = useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  const { openDropDown, setOpenDropDown } = openDropDownObject;
  const { openConfirmationWindow, setOpenConfirmationWindow } =
    openConfirmationWindowObject;
  const { setSelectedItems } = selectedItemsObject;
  const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;

  const ref = useRef<HTMLDivElement>(null);
  const dropDownMenuItems: dropMenuItem[] = [
    { name: "Edit", icon: faPencil },
    { name: "Remove", icon: faTrash },
  ];
  const { dropDownPositions } = dropDownPositionsObject;
  const [hover, setHover] = useState(false);
  const [indexHovered, setIndexHovered] = useState(0);

  function handleHoverChange(index: number, state: boolean) {
    setIndexHovered(index);
    setHover(state);
  }

  function handleClickOption(index: number) {
    switch (index) {
      case 0:
        setOpenHabitWindow(true);
        setOpenDropDown(false);
        // console.log("Edit");
        break;
      case 1:
        setOpenConfirmationWindow(true);
        setOpenDropDown(false);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    function handleOutSideClick(event: MouseEvent) {
      if (ref && !ref.current?.contains(event.target as Node)) {
        setOpenDropDown(false);

        if (!openConfirmationWindow && !openHabitWindow) {
          setSelectedItems(null);
        }
      }
    }
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDropDown]);

  return (
    <div
      ref={ref}
      style={{
        left: dropDownPositions.left - 135,
        top: dropDownPositions.top + 40,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className={`p-3 w-40 fixed z-[60px] shadow-md flex rounded-lg flex-col gap-3 text-[11px] top-11 left-1/3 ${
        openDropDown ? "block" : "hidden"
      }`}
    >
      {dropDownMenuItems.map((menuItem, index) => (
        <div
          style={{
            backgroundColor:
              hover && index === indexHovered ? defaultColor.default : "",
            color: hover && index === indexHovered ? "#ffffff" : "",
          }}
          onClick={() => handleClickOption(index)}
          onMouseEnter={() => handleHoverChange(index, true)}
          onMouseLeave={() => handleHoverChange(index, false)}
          className={`flex gap-2 items-center rounded-md p-3 select-none cursor-pointer transition-all`}
          key={index}
        >
          <FontAwesomeIcon
            style={{
              color:
                hover && index === indexHovered
                  ? "#ffffff"
                  : defaultColor.default,
            }}
            className="size-4"
            icon={menuItem.icon}
          />
          <div
            style={{
              color:
                hover && index === indexHovered
                  ? "#fff"
                  : !isDarkMode
                  ? "black"
                  : "white",
            }}
            className=""
          >
            {menuItem.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
