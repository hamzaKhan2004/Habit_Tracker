import React from "react";
import StatisticsTopBar from "./Components/StatisticsTopBar";
import StatisticsBoard from "./Components/StatisticsBoard";
import StatisticsHabitArea from "./Components/StatisticsHabitArea";

function Statistics() {
  return (
    <div className="w-full min-h-screen p-3">
      <StatisticsTopBar />
      <StatisticsBoard />
      <StatisticsHabitArea />
    </div>
  );
}

export default Statistics;
