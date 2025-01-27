"use client";

import React, {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";
import { GlobalContextType } from "./Types/GlobalContextType";
import { menuItemType } from "./Types/MenuItemType";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import {
  faChartSimple,
  faCode,
  faGraduationCap,
  faLayerGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { DarkModeItem } from "./Types/DarkModeType";
import { AreaType, HabitType } from "./Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { textToIcon } from "./Pages/AllHabits/Components/IconsWindow/IconData";
import { getDateString } from "./utils/allHabitsUtils/DateFunctions";

const GlobalContext = createContext<GlobalContextType>({
  menuItemObject: {
    menuItems: [],
    setMenuItems: () => {},
  },
  openSideBarObject: {
    openSideBar: false,
    setOpenSideBar: () => {},
  },
  darkModeObject: {
    isDarkMode: false,
    setDarkMode: () => {},
    darkModeItems: [],
    setDarkModeItems: () => {},
  },
  habitWindowObject: {
    openHabitWindow: false,
    setOpenHabitWindow: () => {},
  },
  openTimePickerObject: {
    openTimePickerWindow: false,
    setOpenTimePickerWindow: () => {},
  },
  allAreasObject: {
    allAreas: [],
    setAllAreas: () => {},
  },
  allHabitsObject: {
    allHabits: [],
    setAllHabits: () => {},
  },
  selectedCurrentDayObject: {
    selectedCurrentDate: "",
    setSelectedCurrentDate: () => {},
  },
  offsetDayObject: {
    offsetDay: 0,
    setOffsetDay: () => {},
  },
});

function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<menuItemType[]>([
    { name: "All Habits", isSelected: true, icon: faRectangleList },
    { name: "Statistics", isSelected: false, icon: faChartSimple },
    { name: "Areas", isSelected: false, icon: faLayerGroup },
  ]);
  const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
    { id: 1, icon: faSun, isSelected: true },
    { id: 2, icon: faMoon, isSelected: false },
  ]);
  const [allAreas, setAllAreas] = useState<AreaType[]>([
    { id: 1, icon: faUsers, name: "All" },
    { id: 2, icon: faGraduationCap, name: "Study" },
    { id: 3, icon: faCode, name: "Code" },
  ]);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  //Open Habit Window and time picker window
  const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
  const [openTimePickerWindow, setOpenTimePickerWindow] =
    useState<boolean>(false);

  //All Habits logic
  const [allHabits, setAllHabits] = useState<HabitType[]>([]);
  useEffect(() => {
    function fetchData() {
      const allHabitsData = [
        {
          _id: "",
          name: "",
          icon: textToIcon("faTools") as IconProp,
          frequency: [{ type: "Daily", days: ["MON"], number: 1 }],
          notificationTime: "",
          isNotificationOn: false,
          areas: [],
        },
      ];
      setTimeout(() => {
        setAllHabits(allHabitsData);
      }, 1000);
    }
    fetchData();
  }, []);

  //Date And OfDay Logic
  const [selectedCurrentDate, setSelectedCurrentDate] = useState(() =>
    getDateString(new Date())
  );
  const [offsetDay, setOffsetDay] = useState(0);
  return (
    <GlobalContext.Provider
      value={{
        menuItemObject: { menuItems, setMenuItems },
        openSideBarObject: { openSideBar, setOpenSideBar },
        darkModeObject: {
          isDarkMode,
          setDarkMode,
          darkModeItems,
          setDarkModeItems,
        },
        habitWindowObject: {
          openHabitWindow,
          setOpenHabitWindow,
        },
        openTimePickerObject: {
          openTimePickerWindow,
          setOpenTimePickerWindow,
        },
        allAreasObject: { allAreas, setAllAreas },
        allHabitsObject: { allHabits, setAllHabits },
        selectedCurrentDayObject: {
          selectedCurrentDate,
          setSelectedCurrentDate,
        },
        offsetDayObject: { offsetDay, setOffsetDay },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContextProivder() {
  return useContext(GlobalContext);
}

export default GlobalContextProvider;
