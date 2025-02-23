"use client";

import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../Components/SideBar/Sidebar";
import { useGlobalContextProivder } from "../contextApi";
import { menuItemType } from "../Types/MenuItemType";
import AllHabits from "../Pages/AllHabits/AllHabits";
import Statistics from "../Pages/Statistics/Statistics";
import Areas from "../Pages/Areas/Areas";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { darkModeColor, defaultColor } from "@/colors";

export function sendNotifications(habitName: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    const notification = new Notification("Habit Tracker", {
      body: `It's time to do your habit : ${habitName}`,
    });

    //Close the notification after a specified time (e.g. 5 seconds)
    setTimeout(() => {
      notification.close();
    }, 5000);
  }
}

function Dashboard() {
  const { menuItemObject } = useGlobalContextProivder();
  const { darkModeObject } = useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  const { menuItems } = menuItemObject;
  const [selectedMenu, setSelectedMenu] = useState<menuItemType | null>(null);

  let selectComponent = null;

  const requestPermission = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Permission is granted");
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log("requesting permission");
    if ("Notification" in window) {
      requestPermission();
    }
  }, [requestPermission]);

  useEffect(() => {
    menuItems.map((singleItem) => {
      if (singleItem.isSelected) {
        setSelectedMenu(singleItem);
      }
    });
  }, [menuItems]);
  switch (selectedMenu?.name) {
    case "All Habits":
      selectComponent = <AllHabits />;
      break;
    case "Statistics":
      selectComponent = <Statistics />;
      break;
    case "Areas":
      selectComponent = <Areas />;
      break;
    case "All Areas":
      break;
  }
  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
      }}
      className="flex "
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Sidebar />
        {selectComponent}
        <BlackSoftLayer />
      </LocalizationProvider>
    </div>
  );
}
export default Dashboard;

function BlackSoftLayer() {
  const { openSideBarObject } = useGlobalContextProivder();
  const { openSideBar } = openSideBarObject;
  return (
    <div
      className={`w-full h-full bg-black fixed top-0 left-0 opacity-20 z-40 ${
        openSideBar ? "fixed" : "hidden"
      }`}
    ></div>
  );
}
