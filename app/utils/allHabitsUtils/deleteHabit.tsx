import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export async function deleteHabit(
  allHabits: HabitType[],
  setAllHabits: Dispatch<SetStateAction<HabitType[]>>,
  selectedItems: AreaType | HabitType | null
) {
  console.log("Inside deleteHabit function");
  console.log("Deleting habit with ID:", selectedItems?._id);

  try {
    const updatedHabits: HabitType[] = allHabits.filter(
      (habit) => habit._id !== selectedItems?._id
    );

    const response = await fetch(`/api/habits`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ habitId: selectedItems?._id }),
    });

    console.log("API Response Status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      toast.error(`Error: ${errorData.message}`);
      return { success: false, message: errorData.message };
    }

    const data = await response.json();
    console.log("Success response from API:", data);
    
    toast.success("Habit has been deleted successfully");
    setAllHabits(updatedHabits);
    
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error deleting habit:", error);
    toast.error("Something went wrong");
  }
}


// export default deleteHabit;
