import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export async function deleteHabit(
  allHabits: HabitType[],
  setAllHabits: Dispatch<SetStateAction<HabitType[]>>,
  selectedItems: AreaType | HabitType | null
) {
  if (!selectedItems || !selectedItems._id) {
    console.error("No habit selected for deletion.");
    toast.error("Please select a habit to delete.");
    return;
  }

  const habitId = selectedItems._id; // Explicitly extract the habitId
  console.log("Deleting habit with ID:", habitId);

  try {
    const response = await fetch(`/api/habits`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitId }), // Ensure correct body format
    });

    const responseData = await response.json();
    console.log("API Response:", responseData);

    if (!response.ok) {
      console.error("Error:", responseData.message);
      toast.error(`Error: ${responseData.message}`);
      return { success: false, message: responseData.message };
    }

    // Remove the habit from the local state
    setAllHabits((prevHabits) =>
      prevHabits.filter((habit) => habit._id !== habitId)
    );

    toast.success("Habit deleted successfully");
    return { success: true, message: responseData.message };
  } catch (error) {
    console.error("Error deleting habit:", error);
    toast.error("Something went wrong");
  }
}
