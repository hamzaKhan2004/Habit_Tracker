import React from "react";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProivder } from "@/app/contextApi";
import HabitCard from "./SingleHabitCard";

function HabitsCompleted() {
  const { darkModeObject, allFilteredHabitsObject, selectedCurrentDayObject } =
    useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;

  const { allFilteredHabits } = allFilteredHabitsObject;

  const areAllHabitsNotCompleted = allFilteredHabits.every((singleHabit) => {
    return !singleHabit.completedDays.some(
      (day) => day.date === selectedCurrentDate
    );
  });

  console.log(areAllHabitsNotCompleted);

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="bg-white mt-7 p-8 rounded-md"
    >
      <span className="font-bold text-lg mb-2">Habits Completed</span>
      <div className="mt-4 opacity-50">
        <div className="mt-10 w-full flex justify-center">
          {areAllHabitsNotCompleted && (
            <p className="text-sm text-gray-400 w-72 text-center">{`Habit tracking is like a superpower! Don't let it go to waste!`}</p>
          )}
        </div>
        {allFilteredHabits
          .filter(
            (habit, index, self) =>
              habit.completedDays.some(
                (day) => day.date === selectedCurrentDate
              ) &&
              self.findIndex(
                (h) =>
                  h._id === habit._id &&
                  h.completedDays.some((d) => d.date === selectedCurrentDate)
              ) === index
          )
          .map((singleHabit, index) => (
            <HabitCard key={index} singleHabit={singleHabit} />
          ))}
      </div>
    </div>
  );
}
export default HabitsCompleted;

// function HabitCard() {
//   const { darkModeObject } = useGlobalContextProivder();
//   const { isDarkMode } = darkModeObject;
//   return (
//     <div className="flex p-3 items-center justify-between ">
//       <Checkbox
//         icon={<RadioButtonUncheckedIcon />}
//         checkedIcon={<CheckCircleIcon />}
//         sx={{
//           color: defaultColor.default,
//           "&.Mui-checked": {
//             color: defaultColor.default,
//           },
//         }}
//       />

//       <div
//         style={{
//           backgroundColor: isDarkMode
//             ? darkModeColor.backgroundSlate
//             : defaultColor.backgroundSlate,
//         }}
//         className="flex justify-between gap-2 w-full p-3 py-4 rounded-md bg-slate-50  "
//       >
//         <div className="  w-full">
//           {/* Divs for the icon and the name of the habit  */}
//           <div className="flex gap-2 justify-between  ">
//             <div className="flex gap-2 items-center">
//               <FontAwesomeIcon
//                 className="p-3 rounded-full w-4 h-4 bg-customRed text-white"
//                 height={20}
//                 width={20}
//                 icon={faCode}
//               />
//               <span className="">Coding</span>
//             </div>
//           </div>
//           {/* Divs for the areas  */}
//           <div className="flex gap-2 mt-2  ">
//             <div
//               style={{
//                 color: isDarkMode
//                   ? darkModeColor.textColor
//                   : defaultColor.textColor,
//                 backgroundColor: isDarkMode
//                   ? defaultColor[50]
//                   : defaultColor[100],
//               }}
//               className="p-1 text-white text-[12px] rounded-md px-2"
//             >
//               <span className="text-customRed">Area1</span>
//             </div>

//             <div
//               style={{
//                 color: isDarkMode
//                   ? darkModeColor.textColor
//                   : defaultColor.textColor,
//                 backgroundColor: isDarkMode
//                   ? defaultColor[50]
//                   : defaultColor[100],
//               }}
//               className="p-1 text-white text-[12px] rounded-md px-2"
//             >
//               <span className="text-customRed">Area2</span>
//             </div>
//           </div>
//         </div>
//         <div className="w-10 flex items-center justify-center">
//           <IconButton>
//             <MoreVertIcon sx={{ color: isDarkMode ? "white" : "gray" }} />
//           </IconButton>
//         </div>
//       </div>
//     </div>
//   );
// }
