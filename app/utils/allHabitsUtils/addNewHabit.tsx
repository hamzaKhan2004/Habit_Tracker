import { HabitType } from "@/app/Types/GlobalTypes";
import React from "react";
import toast from "react-hot-toast";
import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
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
      throw new Error("Failed to add habit");
    }
    const data = await response.json();
    console.log("API Response:", data, "Status:", response.status);
    //Extract the _id from the response
    const { _id } = data.habit;
    //update the _id of the habit
    const updatedIdOfHabit = { ...habit, _id: _id };
    //Add the updated habit to the allHabits array
    setAllHabits([...allHabits, updatedIdOfHabit]);
    toast.success("Habit add successfully!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("Error adding habit:", error);
    toast.error("Somthing went wrong!");
  }
}
