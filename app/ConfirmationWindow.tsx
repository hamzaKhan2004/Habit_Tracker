/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useGlobalContextProivder } from "./contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import { deleteHabit } from "./utils/allHabitsUtils/deleteHabit";
import { AreaType, HabitType } from "./Types/GlobalTypes";

function ConfirmationWindow() {
  const {
    openConfirmationWindowObject,
    allHabitsObject,
    darkModeObject,
    selectedItemsObject,
  } = useGlobalContextProivder();
  const { selectedItems, setSelectedItems } = selectedItemsObject;
  const { allHabits, setAllHabits } = allHabitsObject;
  const { openConfirmationWindow, setOpenConfirmationWindow } =
    openConfirmationWindowObject;
  const { isDarkMode } = darkModeObject;
  // console.log(openConfirmationWindow);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function isAreaType(item: any): item is AreaType {
    return "name" in item && "icon" in item && !("frequency" in item);
  }

  function isHabitType(item: any): item is HabitType {
    return "frequency" in item && "notificationTime" in item;
  }

  function deleteOption() {
    console.log("Delete button clicked!");
    console.log("Selected Items:", selectedItems);

    if (isHabitType(selectedItems)) {
      deleteHabit(allHabits, setAllHabits, selectedItems).then(() => {
        setOpenConfirmationWindow(false);
        setSelectedItems(null);
      });
    }
  }

  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "30%",
        transform: "translateY(-50%)",
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
      }}
      className={`shadow-md rounded-md md:w-[450px] w-[310px] ${
        isDarkMode ? "shadow-xl shadow-[#415A77]" : ""
      } py-8 pt-10 p-4 z-50 flex flex-col gap-2 items-center ${
        openConfirmationWindow ? "fixed" : "hidden"
      }`}
    >
      <span className="font-bold text-xl">{`Are you sure?`}</span>
      <span className="text-center text-[13px] opacity-75">
        Are you sure you want to delete this item?
        <br />
        This action cannot be undone.
      </span>
      <div className="flex gap-2 mt-5">
        <button
          onClick={() => {
            setOpenConfirmationWindow(false);
            setSelectedItems(null);
          }}
          className="border text-[13px] w-full px-10 p-3 rounded-md"
        >
          Cancle
        </button>

        <button
          onClick={() => deleteOption()}
          className="text-[13px] w-full px-10 p-3 rounded-md text-white bg-customRed"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmationWindow;
