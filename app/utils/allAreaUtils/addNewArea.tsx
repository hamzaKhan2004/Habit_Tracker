import { AreaType } from "@/app/Types/GlobalTypes";
import React from "react";
import toast from "react-hot-toast";

export default function addNewArea({
  areaItem,
  allAreas,
  setAllAreas,
}: {
  areaItem: AreaType;
  allAreas: AreaType[];
  setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
}) {
  try {
    setAllAreas([...allAreas, areaItem]);
    toast.success("Area has been added successfully");
  } catch (error) {
    console.log(error);
  }
}
