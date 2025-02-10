import { useGlobalContextProivder } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import {
  faChevronDown,
  faClose,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useRef, useState } from "react";
import IconsWindow from "./IconsWindow/IconsWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import TimePicker from "./TimePicker";
import HabitWindowAreas from "./HabitWindow/HabitWindowAreas";
import { AreaType } from "@/app/Types/GlobalTypes";
import { addNewHabit } from "@/app/utils/allHabitsUtils/addNewHabit";
import toast from "react-hot-toast";

type FrequencyType = {
  type: string;
  days: string[];
  number: number;
};

type HabitType = {
  _id: string;
  name: string;
  icon: IconProp;
  frequency: FrequencyType[];
  notificationTime: string;
  isNotificationOn: boolean;
  areas: AreaType[];
  completedDays: [];
};

type RepeatOption = {
  name: string;
  isSelected: boolean;
};

type DayOption = {
  id: number;
  name: string;
  isSelected: boolean;
};

const HeaderMemo = memo(Header);
const InputNameAndIconButtonMemo = memo(InputNameAndIconButton);

function HabitWindow() {
  const { habitWindowObject, darkModeObject } = useGlobalContextProivder();
  const { openHabitWindow } = habitWindowObject;
  const { isDarkMode } = darkModeObject;
  const [habitItem, setHabitItem] = useState<HabitType>({
    _id: "",
    name: "",
    icon: faQuestion,
    frequency: [{ type: "Daily", days: ["MON"], number: 1 }],
    notificationTime: "",
    isNotificationOn: false,
    areas: [],
    completedDays: [],
  });

  const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
  const [iconSelected, setIconSelected] = useState<IconProp>(habitItem.icon);
  // console.log("habitItem", habitItem);

  //Functions

  const onUpdateHabitName = (inputText: string) => {
    //Creating a shallow copy of the habit itme
    const copyHabitItem = { ...habitItem };
    //Modifying the name property based on the inputText
    copyHabitItem.name = inputText;
    //Updating the habit item state
    setHabitItem(copyHabitItem);
  };

  //   console.log(habitItem.notificationTime);

  function changeRepeatOption(repeatOptions: RepeatOption[]) {
    const filterIsSelected = repeatOptions.filter(
      (singleOption) => singleOption.isSelected
    );
    const nameOfSelectedOption = filterIsSelected[0].name;
    const copyHabitsItem = { ...habitItem };
    copyHabitsItem.frequency[0].type = nameOfSelectedOption;
    setHabitItem(copyHabitsItem);
  }

  function changeDaysOption(allDays: DayOption[]) {
    const selectDays = allDays
      .filter((singleDay) => singleDay.isSelected)
      .map((day) => day.name);

    const copyHabitsItem = { ...habitItem };
    copyHabitsItem.frequency[0].days = selectDays;

    setHabitItem(copyHabitsItem);
  }

  function changeWeeksOption(weeks: number) {
    const copyHabitsItem = { ...habitItem };

    copyHabitsItem.frequency[0].number = weeks;

    setHabitItem(copyHabitsItem);
  }

  function updateReminderTime(timeValue: string) {
    //We create a shallow copy of the habit item
    const copyHabitsItem = { ...habitItem };

    //Update the notification time property
    copyHabitsItem.notificationTime = timeValue;

    //Update the Habit Item to update the UI
    setHabitItem(copyHabitsItem);
  }

  function getSelectedAreaItems(selectedAreaItems: AreaType[]) {
    const copyHabitsItem = { ...habitItem };
    copyHabitsItem.areas = selectedAreaItems;
    setHabitItem(copyHabitsItem);
  }
  //update the icon property of the habitItem every time the icon selected is changed
  useEffect(() => {
    const copyHabitItem = { ...habitItem };
    copyHabitItem.icon = iconSelected;
    setHabitItem(copyHabitItem);
  }, [iconSelected]);

  useEffect(() => {
    if (openHabitWindow) {
      setHabitItem({
        _id: "",
        name: "",
        icon: faChevronDown,
        frequency: [{ type: "Daily", days: ["MON"], number: 1 }],
        notificationTime: "",
        isNotificationOn: false,
        areas: [],
        completedDays: [],
      });
    }
  }, [openHabitWindow]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className={`top-[3%] left-1/2 transform -translate-x-1/2 w-[80%] z-50 p-10 rounded-md shadow-lg transition-all ${
        openHabitWindow ? "absolute " : "hidden "
      }`}
    >
      <TimePicker onSaveTime={updateReminderTime} />
      <IconsWindow
        openIconWindow={openIconWindow}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
        setIconSelected={setIconSelected}
      />
      <HeaderMemo />
      <InputNameAndIconButtonMemo
        onUpdateHabitName={onUpdateHabitName}
        habitName={habitItem.name}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
      />

      <Repeat
        onChangeOption={changeRepeatOption}
        onChangeDaysOption={changeDaysOption}
        onChangeWeeksOption={changeWeeksOption}
      />
      <Reminder habitItem={habitItem} setHabitItem={setHabitItem} />
      <HabitWindowAreas onChange={getSelectedAreaItems} />
      <SaveButton habit={habitItem} />
    </div>
  );
}

export default HabitWindow;

function Header() {
  const { habitWindowObject } = useGlobalContextProivder();
  const { setOpenHabitWindow } = habitWindowObject;

  return (
    <div className="flex justify-between items-center mb-4">
      <span className="font-bold text-xl">Add New Habit</span>
      <button
        aria-label="Close"
        onClick={() => setOpenHabitWindow(false)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
}

function InputNameAndIconButton({
  onUpdateHabitName,
  habitName,
  setOpenIconWindow,
  iconSelected,
}: {
  onUpdateHabitName: (inputText: string) => void;
  habitName: string;
  setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
  iconSelected: IconProp;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { habitWindowObject, darkModeObject } = useGlobalContextProivder();
  const { openHabitWindow } = habitWindowObject;
  const { isDarkMode } = darkModeObject;

  function updateInputHabit(event: React.ChangeEvent<HTMLInputElement>) {
    onUpdateHabitName(event.target.value);
  }
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);

    //when the window is closed empty the input field by using the callback function
    if (!openHabitWindow) {
      onUpdateHabitName("");
    }
  }, [openHabitWindow]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [iconSelected]);

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="opacity-80 font-semibold">Habit Name</span>
      <div className="flex gap-4 justify-between items-center">
        <input
          type="text"
          style={{
            backgroundColor: isDarkMode ? darkModeColor.background : "white",
          }}
          ref={inputRef}
          value={habitName}
          onChange={(event) => updateInputHabit(event)}
          className={`border w-full border-gray-200 outline-none p-4 rounded-md text-[13px]`}
          placeholder="Type a name for the habit..."
        />
        <FontAwesomeIcon
          className="bg-mainColor mt-[1px] p-4 rounded-md text-white cursor-pointer bg-customRed"
          onClick={() => setOpenIconWindow(true)}
          icon={iconSelected}
          height={16}
          width={20}
        />
      </div>
    </div>
  );
}

function Repeat({
  onChangeOption,
  onChangeDaysOption,
  onChangeWeeksOption,
}: {
  onChangeOption: (repeatOptions: RepeatOption[]) => void;
  onChangeDaysOption: (allDays: DayOption[]) => void;
  onChangeWeeksOption: (weeks: number) => void;
}) {
  const { darkModeObject } = useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;

  const [repeatOptions, setRepeatOptions] = useState<RepeatOption[]>([
    { name: "Daily", isSelected: true },
    { name: "Weekly", isSelected: false },
  ]);

  const days: DayOption[] = [
    { id: 1, name: "MON", isSelected: true },
    { id: 2, name: "TUE", isSelected: false },
    { id: 3, name: "WED", isSelected: false },
    { id: 4, name: "THU", isSelected: false },
    { id: 5, name: "FRI", isSelected: false },
    { id: 6, name: "SAT", isSelected: false },
    { id: 7, name: "SUN", isSelected: false },
  ];
  const [allDays, setAllDays] = useState<DayOption[]>(days);
  const [weeks, setWeeks] = useState(1);
  function changeOption(indexClicked: number) {
    const updateRepeatOptions = repeatOptions.map((singleOption, index) => {
      if (index === indexClicked) {
        return { ...singleOption, isSelected: true };
      }
      return { ...singleOption, isSelected: false };
    });
    setRepeatOptions(updateRepeatOptions);
    onChangeOption(updateRepeatOptions);
  }

  //days
  useEffect(() => {
    onChangeDaysOption(allDays);
  }, [allDays]);

  //weeks
  useEffect(() => {
    onChangeWeeksOption(weeks);
  }, [weeks]);

  // Find the selected option
  const nameOfSelectedOption = repeatOptions.find(
    (option) => option.isSelected
  )?.name;

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="font-semibold text-[17px]">Repeat</span>
      <div className="flex gap-4 mt-2 items-center">
        {repeatOptions.map((singleOption, index) => (
          <button
            key={index}
            onClick={() => changeOption(index)}
            style={{
              backgroundColor: singleOption.isSelected
                ? defaultColor.default
                : !isDarkMode
                ? defaultColor[100]
                : defaultColor[50],
              color: !singleOption.isSelected
                ? !isDarkMode
                  ? defaultColor.textColor
                  : darkModeColor.textColor
                : "white",
            }}
            className="p-2 px-3 rounded-md"
          >
            {singleOption.name}
          </button>
        ))}
      </div>
      {/* Conditionally render DailyOptions or WeeklyOption */}
      {nameOfSelectedOption === "Daily" ? (
        <DailyOptions allDays={allDays} setAllDays={setAllDays} />
      ) : (
        <WeeklyOption weeks={weeks} setWeek={setWeeks} />
      )}
    </div>
  );
}

function DailyOptions({
  allDays,
  setAllDays,
}: {
  allDays: DayOption[];
  setAllDays: React.Dispatch<React.SetStateAction<DayOption[]>>;
}) {
  const { darkModeObject, habitWindowObject } = useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  const { openHabitWindow } = habitWindowObject;

  function selectedDays(singleDayIndex: number) {
    const selectedCount: number = allDays.filter(
      (singleDay) => singleDay.isSelected
    ).length;
    const updatedAllDays = allDays.map((singleDay, index) => {
      if (
        selectedCount === 1 &&
        singleDay.isSelected === true &&
        index === singleDayIndex
      ) {
        return singleDay;
      }
      return index === singleDayIndex
        ? { ...singleDay, isSelected: !singleDay.isSelected }
        : singleDay;
    });
    setAllDays(updatedAllDays);
  }
  useEffect(() => {
    if (openHabitWindow) {
      const updateSelectedDays = allDays.map((singleDay) => {
        return { ...singleDay, isSelected: false };
      });

      updateSelectedDays[0].isSelected = true;
      setAllDays(updateSelectedDays);
    }
  }, [openHabitWindow]);
  return (
    <div className="mt-5 flex flex-col gap-4">
      <span className="font-medium opacity-85">On These Days</span>
      <div className="flex gap-3 w-full flex-wrap">
        {allDays.map((singleDay, signeDayIndex) => (
          <span
            onClick={() => selectedDays(signeDayIndex)}
            style={{
              color: !singleDay.isSelected
                ? !isDarkMode
                  ? defaultColor.default
                  : darkModeColor.textColor
                : "",
              backgroundColor: singleDay.isSelected
                ? defaultColor.default
                : !isDarkMode
                ? defaultColor[100]
                : defaultColor[50],
            }}
            key={signeDayIndex}
            className={`p-2 px-3 w-15 text-center rounded-md select-none cursor-pointer ${
              singleDay.isSelected ? "text-white" : "text-gray-400"
            }`}
          >
            {singleDay.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function WeeklyOption({
  weeks,
  setWeek,
}: {
  weeks: number;
  setWeek: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { darkModeObject } = useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;

  function updateCounter(option: string) {
    if (option === "up") {
      setWeek((prev) => (prev < 7 ? prev + 1 : 7));
    }
    if (option === "down") {
      setWeek((prev) => (prev > 1 ? prev - 1 : 1));
    }
  }
  return (
    <div className="mt-7 flex gap-20">
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Frequency</span>
        <span className="text-sm font-light text-gray-400 ">
          {weeks} times a week
        </span>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => updateCounter("down")}
          style={{
            backgroundColor: !isDarkMode ? defaultColor[100] : defaultColor[50],
            color: !isDarkMode ? defaultColor.default : darkModeColor.textColor,
          }}
          className="p-3 w-10 rounded-md text-white"
        >
          -
        </button>
        <span className="p-4 px-5 select-none">{weeks}</span>
        <button
          onClick={() => updateCounter("up")}
          style={{
            backgroundColor: !isDarkMode ? defaultColor[100] : defaultColor[50],
            color: !isDarkMode ? defaultColor.default : darkModeColor.textColor,
          }}
          className="p-3 w-10 rounded-md text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Reminder({
  habitItem,
  setHabitItem,
}: {
  habitItem: HabitType;
  setHabitItem: React.Dispatch<React.SetStateAction<HabitType>>;
}) {
  const { darkModeObject, openTimePickerObject } = useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  const { setOpenTimePickerWindow } = openTimePickerObject;
  const [isOn, setIsOn] = useState(false);
  // Function to toggle the notification
  function updateToggle() {
    const copyHabitItem = { ...habitItem };
    copyHabitItem.isNotificationOn = !isOn;
    setIsOn(!isOn);
    setHabitItem(copyHabitItem);
  }
  function openTheTimerPicker() {
    setOpenTimePickerWindow(true);
  }
  // Derived value for notification time text
  const notificationTimeText = habitItem.notificationTime || "none";

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <div className="flex justify-between">
        <span className="font-semibold text-[17px]">Daily Notification</span>
        <ToggleSwtich />
      </div>
      {isOn && (
        <div
          style={{
            backgroundColor: !isDarkMode ? defaultColor[100] : defaultColor[50],
            color: !isDarkMode ? defaultColor.default : darkModeColor.textColor,
          }}
          className="flex justify-between p-4 mt-8 rounded-md"
        >
          <span>Select Time</span>
          <div
            onClick={openTheTimerPicker}
            className="flex gap-2 items-center justify-center cursor-pointer select-none"
          >
            <span>{notificationTimeText}</span>
            <FontAwesomeIcon height={12} width={12} icon={faChevronDown} />
          </div>
        </div>
      )}
    </div>
  );
  function ToggleSwtich() {
    return (
      <div
        onClick={updateToggle} // Handle toggle with the wrapper
        className={`${
          isOn ? "bg-customRed" : "bg-slate-400"
        } w-16 h-[30px] relative rounded-lg flex items-center p-1 cursor-pointer`}
      >
        <div
          className={`bg-white h-6 w-6 rounded-full absolute transition-transform ${
            isOn ? "translate-x-8" : "translate-x-0"
          }`}
        ></div>
      </div>
    );
  }
}

function SaveButton({ habit }: { habit: HabitType }) {
  const { allHabitsObject, habitWindowObject } = useGlobalContextProivder();
  const { allHabits, setAllHabits } = allHabitsObject;
  const { setOpenHabitWindow } = habitWindowObject;
  function checkNewHabitObject() {
    if (habit.name.trim() === "") {
      return toast.error("The habit name field is still empty!");
    }
    const habitExist = allHabits.some(
      (singleHaibt) => singleHaibt.name === habit.name
    );
    if (!habitExist) {
      addNewHabit({ allHabits, setAllHabits, newHabit: habit });
      setOpenHabitWindow(false);
    } else {
      toast.error("Habit already Exist!");
    }
  }
  return (
    <div className="w-full flex justify-center mt-9">
      <button
        onClick={checkNewHabitObject}
        className="bg-customRed p-4 w-[98%] rounded-md text-white"
      >
        Add a Habit
      </button>
    </div>
  );
}
