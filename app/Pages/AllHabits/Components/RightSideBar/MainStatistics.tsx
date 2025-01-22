import React from 'react';
import { PieChart, Pie, Cell } from 'recharts'; // Ensure you have `recharts` installed
import { darkModeColor, defaultColor } from '@/colors'; // Make sure this is correctly defined
import { useGlobalContextProivder } from '@/app/contextApi';

interface CircularProgressBarProps {
  progress: number;
}

function MainStatistics() {
  
  const {darkModeObject} = useGlobalContextProivder();
  const {isDarkMode} = darkModeObject;
  const statisticsInfo = [
    { id: 1, num: 7, subTitle: 'Best streaks' },
    { id: 2, num: 10, subTitle: 'Perfect days' },
  ];

  return (
    <div style={{
      color:isDarkMode?darkModeColor.textColor:defaultColor.textColor,
      backgroundColor:isDarkMode?darkModeColor.backgroundSlate:defaultColor.backgroundSlate}}
      className=" flex mx-4 flex-col gap-6 justify-center items-center mt-14  rounded-xl p-5 pt-7 ">
        <span className="font-bold text-xl cursor-pointer hover:text-customRed">Statistics</span>
        
        {/* The circular progress bar */}
        <div className="relative pt-3">
          <CircularProgressBar progress={89} />
          <div className="flex flex-col justify-center items-center absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="font-bold text-xl text-customRed">89%</span>
            <span className="text-[11px]">{`Today's Progress`}</span>
          </div>
        </div>
        
        {/* Best streaks and perfect days */}
        <div className="my-4 flex justify-center gap-6 flex-wrap items-center w-full">
          {statisticsInfo.map((singleItem,singleItemIndex) => (
            <div className="flex  items-center gap-3" key={singleItemIndex}>
              <div className="w-2 h-2 bg-customRed rounded-full"></div>
              <div className="text-[12px]">
                <span className="flex flex-col font-bold ">{singleItem.num}</span>
                <span style={{color:isDarkMode ? darkModeColor.textColor : defaultColor.textColor50}}>{singleItem.subTitle}</span>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
  const data = [
    { name: 'Completed', value: progress },
    { name: 'Remaining', value: 100 - progress },
  ];

  const COLORS = [defaultColor.default, '#edf2f4']; // Adjust colors as per your theme

  return (
    <PieChart width={200} height={160} margin={{ top: -20, bottom: 40, right: 0, left: 0 }}>
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
        stroke='none'
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MainStatistics;
