import React, { useEffect, useState } from "react";
import { useGlobalContextProivder } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
import { v4 as uuidv4 } from "uuid";
import { Checkbox, IconButton } from "@mui/material";
import { darkModeColor, defaultColor } from "@/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { convertIconsToTextOfHabits } from "@/app/utils/allHabitsUtils/editHabit";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { iconToText } from "./IconsWindow/IconData";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";

function HabitCard({ singleHabit }: { singleHabit: HabitType }) {
  const {
    darkModeObject,
    allHabitsObject,
    selectedCurrentDayObject,
    openDropDownObject,
    dropDownPositionsObject,
    selectedItemsObject,
  } = useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  const { allHabits, setAllHabits } = allHabitsObject;
  const { setOpenDropDown } = openDropDownObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { setDropDownPositions } = dropDownPositionsObject;
  const { setSelectedItems } = selectedItemsObject;
  const [checked, setChecked] = useState(
    singleHabit.completedDays.some((day) => day.date === selectedCurrentDate)
  );
  function handleClickedCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    setChecked(checked);
    if (checked) {
      checkHabit();
    } else {
      uncheckTheHabit();
    }
  }

  function checkHabit() {
    const completedDay = {
      _id: uuidv4(),
      date: selectedCurrentDate,
    };

    const updatedHabits: HabitType = {
      ...singleHabit,
      completedDays: [...singleHabit.completedDays, completedDay],
    };

    //server
    const habitToUpdateInTheServer = convertIconsToTextOfHabits(updatedHabits);
    editTheHabitInServer({
      ...habitToUpdateInTheServer,
      icon: habitToUpdateInTheServer.icon as IconProp,
    });

    const updateAllHabits: HabitType[] = allHabits.map((habit) => {
      if (habit._id === updatedHabits._id) {
        return updatedHabits;
      } else {
        return habit;
      }
    });
    setAllHabits(updateAllHabits);
  }
  function uncheckTheHabit() {
    const updatedHabits: HabitType = {
      ...singleHabit,
      completedDays: singleHabit.completedDays.filter(
        (day) => day.date !== selectedCurrentDate
      ),
    };

    //server
    const habitToUpdateInTheServer = convertIconsToTextOfHabits(updatedHabits);
    editTheHabitInServer({
      ...habitToUpdateInTheServer,
      icon: habitToUpdateInTheServer.icon as IconProp,
    });

    const updateAllHabits: HabitType[] = allHabits.map((habit) => {
      if (habit._id === updatedHabits._id) {
        return updatedHabits;
      } else {
        return habit;
      }
    });
    setAllHabits(updateAllHabits);
  }
  function handleClickThreeDots(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;
    setDropDownPositions({ top, left });
    event.stopPropagation();
    setOpenDropDown(true);
    setSelectedItems(singleHabit);
    // console.log(singleHabit);
  }

  useEffect(() => {
    const isCompleted = singleHabit.completedDays.some(
      (day) => day.date === selectedCurrentDate
    );
    setChecked(isCompleted);
  }, [singleHabit, selectedCurrentDate, allHabits]);
  return (
    <div className="flex p-3 items-center justify-between ">
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        onChange={handleClickedCheckbox}
        checked={checked}
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
                <span className={`${isDarkMode ? "" : "text-customRed"}`}>
                  {singleArea.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* div for the three dots button  */}
        <div className="w-10 flex items-center justify-center">
          <IconButton onClick={handleClickThreeDots}>
            <MoreVertIcon sx={{ color: isDarkMode ? "white" : "gray" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

async function editTheHabitInServer(habit: HabitType) {
  try {
    if (!habit._id) {
      console.error("Error: Habit ID is missing.");
      return;
    }

    // Convert the icon to a string before sending
    // const updatedHabit = {
    //   ...habit,
    //   icon: iconToText(habit.icon as IconProp), // Explicitly cast it
    //   areas: habit.areas.map((area) => ({
    //     ...area,
    //     icon: iconToText(area.icon as IconProp), // Explicitly cast it
    //   })),
    // };

    const response = await fetch(`/api/habits?habitId=${habit._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: habit.name,
        icon: habit.icon,
        areas: habit.areas,
        frequency: habit.frequency,
        notificationTime: habit.notificationTime,
        isNotificationOn: habit.isNotificationOn,
        completedDays: habit.completedDays,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update habit:", errorData);
      return;
    }

    console.log("Habit updated successfully!");
  } catch (error) {
    console.error("Error updating habit:", error);
  }
}

export default HabitCard;
