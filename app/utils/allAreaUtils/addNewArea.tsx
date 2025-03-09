import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { AreaType } from "@/app/Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import toast from "react-hot-toast";

export default async function addNewArea({
  areaItem,
  allAreas,
  setAllAreas,
}: {
  areaItem: Omit<AreaType, "_id"> & { clerkUserId: string };
  allAreas: AreaType[];
  setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
}) {
  try {
    // Ensure clerkUserId is not empty
    if (!areaItem.clerkUserId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    // Convert the icon to text
    const { icon } = areaItem;
    const areaIconText = iconToText(icon as IconProp);

    // Update the icon property in the area object
    const updatedArea = { ...areaItem, icon: areaIconText };

    try {
      const response = await fetch("/api/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArea),
      });

      if (!response.ok) {
        throw new Error("Failed to add area");
      }

      // Extract the _id from the response
      const data = await response.json();
      const { _id } = data.area;

      // Update the _id of the area
      const updatedIdOfArea = { ...areaItem, _id: _id };

      // Add the updated area to the allAreas array
      setAllAreas([...allAreas, updatedIdOfArea]);
      toast.success("Area added successfully!");
    } catch (error) {
      toast.error("Something went wrong!...");
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
