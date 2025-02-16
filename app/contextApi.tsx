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
  faBriefcase,
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
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";

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
  selectedAreaStringObject: {
    selectedAreaString: "",
    setSelectedAreaString: () => {},
  },
  allFilteredHabitsObject: {
    allFilteredHabits: [],
    setAllFilteredHabits: () => {},
  },
  openDropDownObject: {
    openDropDown: false,
    setOpenDropDown: () => {},
  },
  dropDownPositionsObject: {
    dropDownPositions: {
      top: 0,
      left: 0,
    },
    setDropDownPositions: () => {},
  },
  openConfirmationWindowObject: {
    openConfirmationWindow: false,
    setOpenConfirmationWindow: () => {},
  },
  selectedItemsObject: {
    selectedItems: null,
    setSelectedItems: () => {},
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
    { _id: uuidv4(), icon: faUsers, name: "All" },
    { _id: uuidv4(), icon: faGraduationCap, name: "Study" },
    { _id: uuidv4(), icon: faCode, name: "Code" },
    { _id: uuidv4(), icon: faBriefcase, name: "Work" },
  ]);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  //Open Habit Window and time picker window
  const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
  const [openTimePickerWindow, setOpenTimePickerWindow] =
    useState<boolean>(false);

  //All Habits logic
  const [allHabits, setAllHabits] = useState<HabitType[]>([]);
  const [selectedAreaString, setSelectedAreaString] = useState<string>("All");
  const [allFilteredHabits, setAllFilteredHabits] = useState<HabitType[]>([]);

  //Drop Down For Edit And Delete Habit
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownPositions, setDropDownPositions] = useState({
    top: 0,
    left: 0,
  });
  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    HabitType | AreaType | null
  >(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    function fetchData() {
      const allHabitsData: HabitType[] = [
        {
          _id: uuidv4(),
          name: "habit 1",
          icon: textToIcon("faTools") as IconProp,
          clerkUserId: user?.id || "",
          frequency: [{ type: "Daily", days: ["MON", "THU"], number: 1 }],
          notificationTime: "",
          isNotificationOn: false,
          areas: [
            {
              _id: uuidv4(),
              icon: textToIcon("faGraduationCap"),
              name: "Study",
            },
            { _id: uuidv4(), icon: textToIcon("faCode"), name: "Code" },
          ],
          completedDays: [
            { _id: uuidv4(), date: "02-02-2025" },
            { _id: uuidv4(), date: "04-02-2025" },
          ],
        },
      ];

      setTimeout(() => {
        // console.log("Setting habits:", allHabitsData);
        setAllHabits(allHabitsData);
      }, 1000);
    }

    function fetchAllAreas() {
      const allAreasData: AreaType[] = [
        { _id: uuidv4(), icon: textToIcon("faGlobe"), name: "All" },
        { _id: uuidv4(), icon: textToIcon("faBook"), name: "Study" },
        { _id: uuidv4(), icon: textToIcon("faCode"), name: "Code" },
      ];
      setAllAreas(allAreasData);
    }
    fetchData();
    fetchAllAreas();
  }, [isSignedIn]);

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
        selectedAreaStringObject: { selectedAreaString, setSelectedAreaString },
        allFilteredHabitsObject: {
          allFilteredHabits,
          setAllFilteredHabits,
        },
        openDropDownObject: {
          openDropDown,
          setOpenDropDown,
        },
        dropDownPositionsObject: {
          dropDownPositions,
          setDropDownPositions,
        },
        openConfirmationWindowObject: {
          openConfirmationWindow,
          setOpenConfirmationWindow,
        },
        selectedItemsObject: {
          selectedItems,
          setSelectedItems,
        },
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
