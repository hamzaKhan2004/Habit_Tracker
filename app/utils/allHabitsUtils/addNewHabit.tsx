import { HabitType } from "@/app/Types/GlobalTypes";
import React from "react";
import toast from "react-hot-toast";

export function addNewHabit({
  allHabits,
  setAllHabits,
  newHabit,
}: {
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  newHabit: HabitType;
}) {
  try {
    setAllHabits([...allHabits, newHabit]);
    toast.success("Habit add successfully!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Somthing went wrong!");
  }
}
