import React, { useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useGlobalContextProivder } from "@/app/contextApi";
import {
  getCurrentDayName,
  getDateString,
  getFormattedDate,
} from "@/app/utils/allHabitsUtils/DateFunctions";

function HabitsContainerTop() {
  const { habitWindowObject, selectedCurrentDayObject, offsetDayObject } =
    useGlobalContextProivder();
  const { setOpenHabitWindow } = habitWindowObject;
  const { selectedCurrentDate, setSelectedCurrentDate } =
    selectedCurrentDayObject;
  const { offsetDay, setOffsetDay } = offsetDayObject;

  type Option = "next" | "prev";
  function updateDate(option: Option) {
    if (option === "next") {
      setOffsetDay((prev) => prev + 1);
    }
    if (option === "prev") {
      setOffsetDay((prev) => prev - 1);
    }
  }
  useEffect(() => {
    setSelectedCurrentDate(getDateString(new Date(), offsetDay));
  }, [offsetDay]);
  return (
    <div className="p-3 flex justify-between items-center">
      <div className="flex gap-4 items-center ">
        <div className="">
          <h2 className="font-bold text-lg w-28">
            {getCurrentDayName(selectedCurrentDate)}
          </h2>
          <span className="font-light text-[12px]">
            {getFormattedDate(selectedCurrentDate)}
          </span>
        </div>
        {/*  */}
        <div className="flex gap-1 ml-4">
          <div
            onClick={() => updateDate("prev")}
            className="text-customRed cursor-pointer"
          >
            <ArrowCircleLeftOutlinedIcon />
          </div>
          <div
            onClick={() => updateDate("next")}
            className="text-customRed cursor-pointer"
          >
            <ArrowCircleRightOutlinedIcon />
          </div>
        </div>
        {/*  */}
        <button
          onClick={() => setOpenHabitWindow(true)}
          className="flex gap-2 items-center bg-customRed p-3 text-white rounded-md text-sm"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>New Habits</span>
        </button>
      </div>
    </div>
  );
}

export default HabitsContainerTop;
