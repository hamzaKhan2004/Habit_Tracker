import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { AreaType } from "@/app/Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import toast from "react-hot-toast";

async function editArea({
  areaItem,
  allAreas,
  setAllAreas,
}: {
  areaItem: AreaType;
  allAreas: AreaType[];
  setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
}) {
  //Convert the icon to text
  const { icon } = areaItem;
  const areaIconText = iconToText(icon as IconProp);
  const copyAreaItem = { ...areaItem, icon: areaIconText };
  const updateAllAreas = allAreas.map((area) => {
    if (area._id === areaItem._id) {
      return areaItem;
    } else {
      return area;
    }
  });

  try {
    const response = await fetch(`/api/areas?areaId=${copyAreaItem._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: copyAreaItem.name,
        icon: copyAreaItem.icon,
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (!response.ok) {
      console.error("Failed to edit area:", data.message);
      toast.error(`Failed to edit area: ${data.message}`);
      return;
    }

    setAllAreas(updateAllAreas);
    toast.success("Area has been updated successfully");
  } catch (error) {
    console.log(error);
  }
}

export default editArea;
