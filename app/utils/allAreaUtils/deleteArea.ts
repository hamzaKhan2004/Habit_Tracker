/* eslint-disable @typescript-eslint/no-unused-vars */
import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export async function deleteArea(
  selectedArea: AreaType,
  allAllAreas: AreaType[],
  setAllAreas: Dispatch<SetStateAction<AreaType[]>>,
  allHabits: HabitType[],
  setAllHabits: Dispatch<SetStateAction<HabitType[]>>
) {
  try {
    const updatedAreas: AreaType[] = allAllAreas.filter(
      (area) => area._id !== selectedArea?._id
    );

    //Delete the selectedArea from allHabits
    const updateAllHabits: HabitType[] = allHabits.map((habit) => {
      if (habit.areas.some((area) => area._id === selectedArea?._id)) {
        return {
          ...habit,
          areas: habit.areas.filter((area) => area._id !== selectedArea?._id),
        };
      } else {
        return habit;
      }
    });

    //Convert all the icons to text of all UpdatedHabits
    const convertIconToTextOfAllHabits: HabitType[] = updateAllHabits.map(
      (habit) => {
        return {
          ...habit,
          icon: iconToText(habit.icon),
          areas: habit.areas.map((area) => ({
            ...area,
            icon: iconToText(area.icon),
          })),
        };
      }
    );
    convertIconToTextOfAllHabits.forEach((habit) => {
      updateHabitInMongoDB(habit);
    });

    const response = await fetch(`/api/areas`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ areaId: selectedArea?._id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      toast.error("Failed to delete area: " + errorData.message);
      return { success: false, message: errorData.message };
    }

    const data = await response.json();

    // ✅ Success toast moved to `deleteOption()` for consistency
    setAllAreas(updatedAreas);
    return { success: true, message: data.message };
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Error in deleting area:", error);
    return { success: false, message: "Something went wrong" };
  }
}

async function updateHabitInMongoDB(habit: HabitType) {
  try {
    const response = await fetch(`/api/habits?habitId=${habit._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
      //Handle non-200 HTTP status codes
      const errorData = await response.json();
      toast.error(errorData.message || "Something went wrong");
      return;
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.log("Error in AreaUpdate in Mongodb", error);
  }
}
