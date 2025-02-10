import React from "react";
import ListIcon from "../Assests/ListIcon";
import { defaultColor } from "@/colors";
export default function HabitsEmptyPlaceHolder() {
  return (
    <div className="flex justify-center items-center p-5 flex-col">
      <ListIcon color={defaultColor.textColor50} />
      <span>Nothing scheduled for this day</span>
    </div>
  );
}
