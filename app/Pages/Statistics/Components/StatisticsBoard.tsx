import { useGlobalContextProivder } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";
import { darkModeColor, defaultColor } from "@/colors";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import {
  faBorderAll,
  faChartSimple,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type StatisticsCard = {
  id: number;
  icon: IconProp;
  counter: number;
  text: string;
};

export default function StatisticsBoard() {
  const [statisticsCard, setStatisticsCard] = useState<StatisticsCard[]>([
    { id: 1, icon: faFaceSmile, counter: 5, text: "Total Habits" },
    { id: 2, icon: faBorderAll, counter: 3, text: "Total Perfect Days" },
    { id: 3, icon: faChartSimple, counter: 1.2, text: "Average Per Daily" },
    { id: 4, icon: faCheck, counter: 13, text: "Best Streak" },
  ]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    darkModeObject: { isDarkMode },
    allHabitsObject: { allHabits },
  } = useGlobalContextProivder();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const dateCounts: { [key: string]: number } = {};
    // console.log("All Habits:", allHabits);

    // Count completed habits per date
    allHabits.forEach((habit) => {
      if (habit.completedDays && habit.completedDays.length > 0) {
        habit.completedDays.forEach((day) => {
          const date = day.date;
          dateCounts[date] = (dateCounts[date] || 0) + 1;
        });
      }
    });

    // console.log("Date Counts (Completed Days Per Date):", dateCounts);

    let perfectDayCount = 0;
    const totalHabitsInEachDay: { [key: string]: number } = {};
    const uniqueDates = Object.keys(dateCounts);

    for (const date of uniqueDates) {
      const dayShort = getCurrentDayName(date).slice(0, 3).toUpperCase(); // Ensure uppercase (e.g., "SUN")
      //   console.log(`Processing date: ${date}, dayShort: ${dayShort}`);

      // Filter habits scheduled for this day
      const scheduledHabits = allHabits.filter((habit) => {
        if (habit.frequency && habit.frequency.length > 0) {
          return habit.frequency.some((freq) => {
            console.log(
              `Habit: ${habit.name}, Frequency Days: ${freq.days.join(", ")}`
            );
            return freq.days.includes(dayShort);
          });
        }
        return false; // If frequency is undefined or empty, the habit is not scheduled
      });

      //   console.log(
      //     `Habits scheduled for ${date} (${dayShort}):`,
      //     scheduledHabits
      //   );

      totalHabitsInEachDay[date] = scheduledHabits.length; // Store count of scheduled habits

      // Check if the number of completed habits matches the number of scheduled habits
      if (dateCounts[date] === scheduledHabits.length) {
        perfectDayCount++;
      }
    }

    // console.log("Total Habits Scheduled Per Date:", totalHabitsInEachDay);
    // console.log("Final Perfect Day Count:", perfectDayCount);

    const totalCompletedHabits = Object.values(dateCounts).reduce(
      (sum, val) => sum + val,
      0
    );
    const averagePerDaily =
      uniqueDates.length > 0
        ? parseFloat((totalCompletedHabits / uniqueDates.length).toFixed(3))
        : 0;

    const streaks = allHabits.map((habit) => calculateStreak(habit));
    const totalStreak = streaks.reduce((a, b) => a + b, 0);

    setStatisticsCard((prevStats) => [
      { ...prevStats[0], counter: allHabits.length },
      { ...prevStats[1], counter: perfectDayCount },
      { ...prevStats[2], counter: averagePerDaily },
      { ...prevStats[3], counter: totalStreak },
    ]);
  }, [allHabits]);

  const filteredStatisticsCard =
    windowWidth < 640
      ? statisticsCard.filter((card) => card.text !== "Average Per Daily")
      : statisticsCard;

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className="p-5 mt-4  rounded-md grid grid-cols-4 gap-4 max-sm:grid-cols-3"
    >
      {filteredStatisticsCard.map((singleCard, singleIndex) => (
        <div
          style={{
            backgroundColor: isDarkMode
              ? darkModeColor.backgroundSlate
              : defaultColor.backgroundSlate,
          }}
          key={singleIndex}
          className="flex flex-col gap-1 items-start p-5 rounded-md"
        >
          <FontAwesomeIcon className="text-customRed" icon={singleCard.icon} />
          <span className="font-bold text-xl mt-3">{singleCard.counter}</span>
          <span className="font-light text-sm ">{singleCard.text}</span>
        </div>
      ))}
    </div>
  );
}

export function calculateStreak(habit: HabitType): number {
  function getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[date.getUTCDay()]; // ✅ Fix: Get day of the week correctly
  }

  // Convert the completed days to day of the week
  const completeDays = habit.completedDays.map((day) => day.date);
  const frequency = habit.frequency[0].days;
  const completedDaysOfWeek = completeDays.map(getDayOfWeek);

  let streak = 0;
  let maxStreak = 0;
  let lastIndex = -1;

  for (let i = 0; i < completedDaysOfWeek.length; i++) {
    const day = completedDaysOfWeek[i];
    const currentIndex = frequency.indexOf(day);

    if (currentIndex === -1) {
      streak = 0;
    } else {
      if (
        lastIndex === -1 ||
        currentIndex === (lastIndex + 1) % frequency.length
      ) {
        streak++;
      } else {
        streak = 1;
      }
      lastIndex = currentIndex;
      maxStreak = Math.max(maxStreak, streak);
    }
  }
  return streak;
}
