import { HabitType } from "@/app/Types/GlobalTypes";
import React from "react";
import toast from "react-hot-toast";
import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import scheduleNotifications from "../notificationFunctions";
export async function addNewHabit({
  allHabits,
  setAllHabits,
  habit,
}: {
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  habit: Omit<HabitType, "_id">;
}) {
  const { icon, areas } = habit;
  const habitIconText = iconToText(icon);

  const areasCopy = areas.map((area) => ({
    ...area,
    icon: iconToText(area.icon as IconProp),
  }));

  const updateHabit = { ...habit, icon: habitIconText, areas: areasCopy };

  try {
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateHabit),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Capture error message from API response
      console.error("API Error:", errorText, "Status:", response.status);
      throw new Error(
        `Failed to add habit. Server responded with: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("API Response:", data, "Status:", response.status);

    //Extract the _id from the response
    const { _id } = data.habit;

    //update the _id of the habit
    const updatedIdOfHabit = { ...habit, _id: _id };

    //Add the updated habit to the allHabits array
    setAllHabits([...allHabits, updatedIdOfHabit]);

    if (updatedIdOfHabit.isNotificationOn) {
      //notificationTime :"09:49 PM"
      //days ["MON","WED","FRI"]
      scheduleNotifications(
        updateHabit.notificationTime,
        updateHabit.frequency[0].days,
        updateHabit.name
      );
    }
    toast.success("Habit add successfully!");
  } catch (error) {
    console.error("Error adding habit:", error);
    toast.error("Somthing went wrong! try again");
  }
}
