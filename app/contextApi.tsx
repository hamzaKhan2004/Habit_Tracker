/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  faFlask,
  faGlobe,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { DarkModeItem } from "./Types/DarkModeType";
import { AreaType, HabitType } from "./Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  iconToText,
  textToIcon,
} from "./Pages/AllHabits/Components/IconsWindow/IconData";
import { getDateString } from "./utils/allHabitsUtils/DateFunctions";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
// import HabitsCollection from "./Models/HabitSchema";

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
  openAreaFormObject: {
    openAreaForm: false,
    setOpenAreaForm: () => {},
  },
  openIconWindowObject: {
    openIconWindow: false,
    setOpenIconWindow: () => {},
    iconSelected: faFlask,
    setIconSelected: () => {},
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
  // const [allAreas, setAllAreas] = useState<AreaType[]>([
  //   { _id: uuidv4(), icon: faUsers, name: "All" },
  //   { _id: uuidv4(), icon: faGraduationCap, name: "Study" },
  //   { _id: uuidv4(), icon: faCode, name: "Code" },
  //   { _id: uuidv4(), icon: faBriefcase, name: "Work" },
  // ]);

  const [allAreas, setAllAreas] = useState<AreaType[]>([]); // new logic
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
  const { isLoaded, isSignedIn, user } = useUser();
  const [openAreaForm, setOpenAreaForm] = useState(false);
  const [openIconWindow, setOpenIconWindow] = useState(false);
  const [iconSelected, setIconSelected] = useState<IconProp>(faFlask);

  useEffect(() => {
    if (!user?.id) return; // Ensure user ID is available before fetching

    const fetchAllHabits = async () => {
      try {
        const response = await fetch(`/api/habits?clerkId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch habits");
        }
        const data: { habits: HabitType[] } = await response.json();

        // Convert the icon of the habit from string to IconProp
        // const updatedHabits = data.habits.map((habit: HabitType) => ({
        //   ...habit,
        //   icon:
        //     typeof habit.icon === "string"
        //       ? (textToIcon(habit.icon) as IconProp)
        //       : habit.icon,
        //   areas: habit.areas.map((area: AreaType) => ({
        //     ...area,
        //     icon:
        //       typeof area.icon === "string"
        //         ? (textToIcon(area.icon) as IconProp)
        //         : area.icon,
        //   })),
        // }));

        //New Logic for updatedHabits
        const updatedHabits = data.habits.map((habit: HabitType) => {
          if (typeof habit.icon === "string") {
            return {
              ...habit,
              icon: textToIcon(habit.icon) as IconProp,
            };
          }
          return habit;
        });

        // console.log(updatedHabits);
        const updatedHabitsWithAreas = updatedHabits.map((habit: HabitType) => {
          const updatedAreas = habit.areas.map((area: AreaType) => {
            if (typeof area.icon === "string") {
              return {
                ...area,
                icon: textToIcon(area.icon) as IconProp,
              };
            }
            return area;
          });
          return { ...habit, areas: updatedAreas };
        });

        setAllHabits(updatedHabitsWithAreas);
      } catch (error) {
        console.log("Error fetching habits: ", error);
      }
    };

    //Dynamic fetching the areas
    async function fetchAllAreas() {
      try {
        const response = await fetch(`/api/areas?clerkId=${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch areas");
        }

        let { areas }: { areas: AreaType[] } = await response.json();

        // 🛠️ Ensure "All" area always exists
        const allAreaExists = areas.some((area) => area.name === "All");

        if (!allAreaExists) {
          const allArea = await addTheAllAreas(); // Ensure "All" area is added
          if (allArea) {
            // Refetch areas after adding "All"
            const newResponse = await fetch(`/api/areas?clerkId=${user?.id}`);
            const newData: { areas: AreaType[] } = await newResponse.json();
            areas = newData.areas; // Update areas with new data
          }
        }

        // 🔧 Convert icon string to IconProp
        const updatedAreas = areas.map((area: AreaType) => ({
          ...area,
          icon:
            typeof area.icon === "string" ? textToIcon(area.icon) : area.icon,
        }));

        setAllAreas(updatedAreas);
      } catch (error) {
        console.log("Error in fetchAllAreas Function:", error);
      }
    }

    //new logic
    if (isLoaded && isSignedIn) {
      fetchAllHabits();
      fetchAllAreas();
    }
    // fetchAllHabits();
  }, [isLoaded, isSignedIn, user?.id]); // Depend on user ID
  async function addTheAllAreas() {
    const allArea = {
      icon: iconToText(faGlobe),
      name: "All",
      clerkUserId: user?.id as string,
    };

    try {
      const response = await fetch("/api/areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allArea),
      });

      if (!response.ok) {
        throw new Error("Failed to add the default 'All' area");
      }

      const data = await response.json();
      return { ...allArea, _id: data.area._id }; // 🛠️ Return updated area with ID
    } catch (error) {
      console.log("Error in addTheAllAreas Function:", error);
    }
  }

  const [selectedCurrentDate, setSelectedCurrentDate] = useState(() =>
    getDateString(new Date())
  );
  const [offsetDay, setOffsetDay] = useState(0);

  //Each time the menu items are updated, the sidebar is closed
  useEffect(() => {
    setOpenSideBar(false);
    setOpenAreaForm(false);
    setOpenConfirmationWindow(false);
    setOpenHabitWindow(false);
  }, [menuItems]);

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
        openAreaFormObject: {
          openAreaForm,
          setOpenAreaForm,
        },
        openIconWindowObject: {
          openIconWindow,
          setOpenIconWindow,
          iconSelected,
          setIconSelected,
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
