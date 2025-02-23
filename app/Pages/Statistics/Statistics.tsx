import React from "react";
import StatisticsTopBar from "./Components/StatisticsTopBar";
import StatisticsBoard from "./Components/StatisticsBoard";

function Statistics() {
  return (
    <div className="w-full h-screen p-3">
      <StatisticsTopBar />
      <StatisticsBoard />
    </div>
  );
}

export default Statistics;
