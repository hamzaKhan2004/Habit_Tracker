import React from "react";
import { Checkbox, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCode } from "@fortawesome/free-solid-svg-icons";
import { darkModeColor, defaultColor } from "@/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProivder } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";

function HabitsContainerMiddle() {
  const { allHabitsObject } = useGlobalContextProivder();
  const { allHabits } = allHabitsObject;

  // Filter to include only valid habits
  const validHabits = allHabits.filter(
    (habit) =>
      habit && // Check habit is not null or undefined
      typeof habit.name === "string" &&
      habit.name.trim() !== "" && // Ensure a valid name exists
      Array.isArray(habit.areas) && // Check areas is an array
      habit.icon // Check icon is provided
  );

  return (
    <div className="p-3">
      {validHabits.map((singleHabit, singleHabitIndex) => (
        <div key={singleHabitIndex}>
          <HabitCard singleHabit={singleHabit} />
        </div>
      ))}
    </div>
  );
}

function HabitCard({ singleHabit }: { singleHabit: HabitType }) {
  const { darkModeObject } = useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  return (
    <div className="flex p-3 items-center justify-between ">
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        sx={{
          color: defaultColor.default,
          "&.Mui-checked": {
            color: defaultColor.default,
          },
        }}
      />

      <div
        style={{
          backgroundColor: isDarkMode
            ? darkModeColor.backgroundSlate
            : defaultColor.backgroundSlate,
        }}
        className="flex justify-between gap-2 w-full p-3 py-4 rounded-md bg-slate-50  "
      >
        <div className="  w-full">
          {/* Divs for the icon and the name of the habit  */}
          <div className="flex gap-2 justify-between  ">
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon
                className="p-3 rounded-full w-4 h-4 bg-customRed text-white"
                height={20}
                width={20}
                icon={singleHabit.icon}
              />
              <span className="">{singleHabit.name}</span>
            </div>
          </div>
          {/* Divs for the areas  */}
          <div className="flex gap-2 mt-2  ">
            {singleHabit.areas.map((singleArea, index) => (
              <div
                key={index}
                style={{
                  color: isDarkMode
                    ? darkModeColor.textColor
                    : defaultColor.textColor,
                  backgroundColor: isDarkMode
                    ? defaultColor[50]
                    : defaultColor[100],
                }}
                className="p-1 text-white text-[12px] rounded-md px-2"
              >
                <span className="text-customRed">{singleArea.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-10 flex items-center justify-center">
          <IconButton>
            <MoreVertIcon sx={{ color: isDarkMode ? "white" : "gray" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default HabitsContainerMiddle;
