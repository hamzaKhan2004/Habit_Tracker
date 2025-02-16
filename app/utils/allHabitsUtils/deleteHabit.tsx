import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

function deleteHabit(
  allHabits: HabitType[],
  setAllHabits: Dispatch<SetStateAction<HabitType[]>>,
  selectedItems: AreaType | HabitType | null
) {
  console.log(allHabits);

  try {
    const updatedHabits: HabitType[] = allHabits.filter(
      (habit) => habit._id !== selectedItems?._id
    );
    setAllHabits(updatedHabits);
    toast.success("Habit has been  deleted successfully");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Something went wrong ");
  }
  //   return <div>deleteHabit</div>;
}

export default deleteHabit;
