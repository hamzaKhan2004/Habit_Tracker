import { useGlobalContextProivder } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
import { darkModeColor, defaultColor } from "@/colors";
import {
  faBook,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "@/app/styles/calendarHeatmap.css";
import { calculateStreak } from "./StatisticsBoard";
// import "../../../styles/calendarHeatmap.css";

export default function StatisticsHabitCard({ habit }: { habit: HabitType }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    darkModeObject: { isDarkMode },
  } = useGlobalContextProivder();
  const recurringDaysText = habit.frequency[0].days.join(",");
  console.log(recurringDaysText);
  function calculateConsistency(habit: HabitType): number {
    const streak = calculateStreak(habit);
    const completedDays = habit.completedDays.length;

    if (completedDays === 0) {
      return 0; // Avoid division by zero
    }

    return (streak / completedDays) * 100;
  }

  console.log(habit.name, calculateConsistency(habit));

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className="p-5 rounded-md m-3 mb-6"
    >
      {/* Icon + Habit name + notification + frequency  */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          {/* Icon  */}
          <div className="bg-customRed w-10 rounded-full p-3 flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faBook} />
          </div>
          {/* Habit Name  */}
          <span>{habit.name}</span>
          {/* Notification  */}
          {habit.isNotificationOn && (
            <span
              style={{
                backgroundColor: defaultColor[100],
                color: defaultColor.default,
              }}
              className="p-1 text-sm px-3 rounded-md"
            >
              {habit.notificationTime}
            </span>
          )}
        </div>
        {/*  */}
        {/* Frequency */}
        <div>
          <span className="text-gray-400">{recurringDaysText}</span>
        </div>
      </div>
      {/* Single card stats  */}
      <div className="mt-5 p-2 grid grid-cols-3">
        <div className="flex flex-col gap-1 justify-center items-center">
          <span className="font-bold">{habit.completedDays.length}</span>
          <span>Total</span>
        </div>

        <div className="flex flex-col gap-1 justify-center items-center">
          <span className="font-bold">
            {calculateConsistency(habit).toFixed(0)}
          </span>
          <span>Consistency</span>
        </div>

        <div className="flex flex-col gap-1 justify-center items-center">
          <span className="font-bold">{calculateStreak(habit)}</span>
          <span>Streaks</span>
        </div>
      </div>

      {/* Headmap  */}
      <div
        style={{
          backgroundColor: isDarkMode
            ? darkModeColor.backgroundSlate
            : defaultColor.backgroundSlate,
        }}
        className={`w-full mt-8 flex justify-center transition-all ${
          isExpanded ? "h-48" : "h-0"
        }`}
      >
        <div className={`w-[600px] ${isExpanded ? "block" : "hidden"}`}>
          <HabitHeatmap habit={habit} />
        </div>
      </div>
      {/* Arrow to expand the card  */}
      <div className="flex justify-end mt-3">
        <FontAwesomeIcon
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer"
          icon={isExpanded ? faChevronUp : faChevronDown}
        />
      </div>
    </div>
  );
}

type DateData = {
  date: string;
  count: number;
};

function transformToDateData(habit: HabitType): DateData[] {
  const dateMap: { [date: string]: number } = {};
  habit.completedDays.forEach((day) => {
    if (dateMap[day.date]) {
      dateMap[day.date]++;
    } else {
      dateMap[day.date] = 1;
    }
  });

  return Object.keys(dateMap).map((date) => ({
    date: date,
    count: dateMap[date],
  }));
}

// const dateData: DateData[] = [
//   { date: "2024-01-03", count: 1 },
//   { date: "2024-02-10", count: 4 },
//   { date: "2024-03-15", count: 2 },
//   { date: "2024-04-20", count: 3 },
//   { date: "2024-05-25", count: 1 },
//   { date: "2024-06-30", count: 2 },
//   { date: "2024-07-05", count: 4 },
//   { date: "2024-08-12", count: 3 },
//   { date: "2024-09-18", count: 1 },
//   { date: "2024-10-22", count: 2 },
//   { date: "2024-11-29", count: 3 },
//   { date: "2024-12-31", count: 5 },
// ];

const HabitHeatmap = ({ habit }: { habit: HabitType }) => {
  const dateData: DateData[] = transformToDateData(habit);
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 6);

  return (
    <div className="">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate} // Extend the range to a full year
        values={dateData}
        showMonthLabels={true}
        showWeekdayLabels={true}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return "color-scale-4";
        }}
      />
    </div>
  );
};
