import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import toast from "react-hot-toast";
import scheduleNotifications from "../notificationFunctions";

export function convertIconsToTextOfHabits(habit: HabitType) {
  const { icon, areas } = habit;
  //convert the icon from iconprop to string in the icon property and in the areas property
  const habitIconToText = iconToText(icon as IconProp);

  //Convert the icons in the areas array
  const areasCopy = areas.map((area) => ({
    ...area,
    icon: iconToText(area.icon as IconProp),
  }));

  //update the icon and the areas in the habit object to update in the db
  const updatedHabit = { ...habit, icon: habitIconToText, areas: areasCopy };
  return updatedHabit;
}

async function editHabit({
  allHabits,
  setAllHabits,
  selectedItems,
  habit,
}: {
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  selectedItems: AreaType | HabitType | null;
  habit: HabitType;
}) {
  try {
    const currentHabitSelected = selectedItems as HabitType;
    const findTheHabit = allHabits.findIndex(
      (singleHabit) => singleHabit._id === currentHabitSelected._id
    );

    const copyAllHabits = [...allHabits];
    copyAllHabits[findTheHabit] = habit;

    //convert the icon from iconprop to string in the icon property and in the areas property
    const { icon, areas } = habit;
    const habitIconToText = iconToText(icon as IconProp);

    //Convert the icons in the areas array
    const areasCopy = areas.map((area) => ({
      ...area,
      icon: iconToText(area.icon as IconProp),
    }));

    //update the icon and the areas in the habit object to update in the db
    const updatedHabit = { ...habit, icon: habitIconToText, areas: areasCopy };
    //convert the icon from iconprop to string in the icon property and in the areas property
    // const updatedHabit = convertIconsToTextOfHabits(habit);

    // console.log(currentHabitSelected._id);

    const response = await fetch(
      `/api/habits?habitId=${currentHabitSelected._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedHabit.name,
          icon: updatedHabit.icon,
          areas: updatedHabit.areas,
          frequency: updatedHabit.frequency,
          notificationTime: updatedHabit.notificationTime,
          isNotificationOn: updatedHabit.isNotificationOn,
          completedDays: updatedHabit.completedDays,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Something went wrong");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await response.json();

    setAllHabits(copyAllHabits);
    toast.success("Habit has been updated successfully");

    if (updatedHabit.isNotificationOn) {
      //notificationTime :"09:49 PM"
      //days ["MON","WED","FRI"]
      scheduleNotifications(
        updatedHabit.notificationTime,
        updatedHabit.frequency[0].days,
        updatedHabit.name
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export default editHabit;
