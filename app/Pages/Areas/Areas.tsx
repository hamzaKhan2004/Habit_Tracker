/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import AllAreasTopBar from "./Components/AllAreasTopBar";
import AllAreasContainer from "./Components/AllAreasContainer";
import ConfirmationWindow from "@/app/ConfirmationWindow";
import Dropdown from "@/app/Dropdown";
import { useGlobalContextProivder } from "@/app/contextApi";
import IconsWindow from "../AllHabits/Components/IconsWindow/IconsWindow";
import { Toaster } from "react-hot-toast";

function Areas() {
  const {
    openIconWindowObject: {
      openIconWindow,
      setOpenIconWindow,
      iconSelected,
      setIconSelected,
    },
  } = useGlobalContextProivder();
  return (
    <div className="w-full min-h-screen p-3 relative">
      <IconsWindow
        openIconWindow={openIconWindow}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
        setIconSelected={setIconSelected}
      />
      <Toaster />
      <Dropdown />
      <ConfirmationWindow />
      <AllAreasTopBar />
      <AllAreasContainer />
    </div>
  );
}

export default Areas;
