import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts"; // Ensure you have `recharts` installed
import { darkModeColor, defaultColor } from "@/colors"; // Make sure this is correctly defined
import { useGlobalContextProivder } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";
import { calculateStreak } from "@/app/Pages/Statistics/Components/StatisticsBoard";

interface CircularProgressBarProps {
  progress: number;
}

function MainStatistics() {
  const { darkModeObject, selectedCurrentDayObject, allHabitsObject } =
    useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { allHabits } = allHabitsObject;
  const [statisticsInfo, setStatisticsInfo] = useState([
    { id: 1, num: 7, subTitle: "Best streaks" },
    { id: 2, num: 10, subTitle: "Perfect days" },
  ]);

  const [progress, setProgress] = useState<number>(0);

  function calculateThePercentageOfTodaysProgress(
    allHabits: HabitType[]
  ): number {
    if (allHabits.length === 0 || !selectedCurrentDate) {
      return 0;
    }

    let totalHabitsOfCompletedDays = 0;
    let totalAllHabitsOfCurrentDay = 0;

    if (allHabits) {
      // Get the completed habits for the current date
      const completedHabitsOfCurrentDate: HabitType[] = allHabits.filter(
        (habit) =>
          habit.completedDays.some((day) => day.date === selectedCurrentDate)
      );
      totalHabitsOfCompletedDays = completedHabitsOfCurrentDate.length;

      // Get the three-letter uppercase abbreviation of the current day (e.g., "MON", "TUE")
      const getThreeLetterOfCurrentDay = getCurrentDayName(selectedCurrentDate)
        .slice(0, 3)
        .toUpperCase(); // Ensure uppercase

      // Get all habits scheduled for the current day
      const allHabitsOfCurrentDay = allHabits.filter((habit) =>
        habit.frequency[0].days.some(
          (day) => day.toUpperCase() === getThreeLetterOfCurrentDay // Ensure both are uppercase
        )
      );

      totalAllHabitsOfCurrentDay = allHabitsOfCurrentDay.length;

      // Prevent division by zero
      const result =
        totalAllHabitsOfCurrentDay > 0
          ? (totalHabitsOfCompletedDays / totalAllHabitsOfCurrentDay) * 100
          : 0;

      console.log("Today's Progress:", result);
      return isNaN(result) ? 0 : Math.round(result);
    }

    return 0;
  }

  function calculateTotalPerfectDays(
    allHabits: HabitType[],
    selectedCurrentDate: string
  ): number {
    if (!selectedCurrentDate || allHabits.length === 0) return 0;

    // Get the three-letter uppercase abbreviation of the current day (e.g., "MON", "TUE")
    const currentDay = getCurrentDayName(selectedCurrentDate)
      .slice(0, 3)
      .toUpperCase();

    // Get all habits scheduled for today
    const habitsForToday = allHabits.filter((habit) =>
      habit.frequency[0].days.some((day) => day.toUpperCase() === currentDay)
    );

    // Check if every scheduled habit for today is completed
    const isPerfectDay = habitsForToday.every((habit) =>
      habit.completedDays.some((day) => day.date === selectedCurrentDate)
    );

    return isPerfectDay ? 1 : 0;
  }

  useEffect(() => {
    setProgress(calculateThePercentageOfTodaysProgress(allHabits));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrentDate, allHabits]);

  useEffect(() => {
    const streaks = allHabits.map((habit) => calculateStreak(habit));
    const totalStreak = streaks.reduce((a, b) => a + b, 0);

    // Pass `selectedCurrentDate` correctly
    const perfectDays = calculateTotalPerfectDays(
      allHabits,
      selectedCurrentDate
    );

    const copyStatsInfo = [...statisticsInfo];
    copyStatsInfo[0].num = totalStreak;
    copyStatsInfo[1].num = perfectDays;
    setStatisticsInfo(copyStatsInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allHabits, selectedCurrentDate]);

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
      }}
      className=" flex mx-4 flex-col gap-6 justify-center items-center mt-14  rounded-xl p-5 pt-7 "
    >
      <span className="font-bold text-xl cursor-pointer hover:text-customRed">
        Statistics
      </span>

      {/* The circular progress bar */}
      <div className="relative pt-3">
        <CircularProgressBar progress={progress} />
        <div className="flex flex-col justify-center items-center absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="font-bold text-xl text-customRed">{progress}</span>
          <span className="text-[11px]">{`Today's Progress`}</span>
        </div>
      </div>

      {/* Best streaks and perfect days */}
      <div className="my-4 flex justify-center gap-6 flex-wrap items-center w-full">
        {statisticsInfo.map((singleItem, singleItemIndex) => (
          <div className="flex  items-center gap-3" key={singleItemIndex}>
            <div className="w-2 h-2 bg-customRed rounded-full"></div>
            <div className="text-[12px]">
              <span className="flex flex-col font-bold ">{singleItem.num}</span>
              <span
                style={{
                  color: isDarkMode
                    ? darkModeColor.textColor
                    : defaultColor.textColor50,
                }}
              >
                {singleItem.subTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
}) => {
  const data = [
    { name: "Completed", value: progress },
    { name: "Remaining", value: 100 - progress },
  ];

  const COLORS = [defaultColor.default, "#edf2f4"]; // Adjust colors as per your theme

  return (
    <PieChart
      width={200}
      height={160}
      margin={{ top: -20, bottom: 40, right: 0, left: 0 }}
    >
      <Pie
        data={data}
        cx={100}
        cy={100}
        startAngle={180}
        endAngle={-180}
        innerRadius={66}
        outerRadius={progress === 100 ? 80 : 78}
        fill="#edf2f4"
        paddingAngle={0}
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MainStatistics;
