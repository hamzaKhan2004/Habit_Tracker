import React from "react";
import AllHabitsTopBar from "./Components/AllHabitsTopBar";
import AllHabitsRightSideBar from "./Components/AllHabitsRightSideBar";
import HabitsContainer from "./Components/HabitsContainer";
import HabitsCompleted from "./Components/HabitsCompleted";
import HabitWindow from "./Components/HabitWindow";
import { Toaster } from "react-hot-toast";
import AreasContainer from "./Components/AreasContainer";
import ConfirmationWindow from "@/app/ConfirmationWindow";
import Dropdown from "@/app/Dropdown";

function AllHabits() {
  return (
    <div className="max-lg:flex-col flex-row gap-0 w-full flex relative">
      <ConfirmationWindow />
      <Dropdown />
      <Toaster />
      <HabitWindow />
      <div className="flex-col flex-grow m-3">
        <AllHabitsTopBar />
        <AreasContainer />
        <HabitsContainer />
        <HabitsCompleted />
      </div>
      <AllHabitsRightSideBar />
    </div>
  );
}

export default AllHabits;
