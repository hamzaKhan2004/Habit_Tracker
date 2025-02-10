import React, { useEffect } from "react";
import { useGlobalContextProivder } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";
import HabitsEmptyPlaceHolder from "@/app/EmptyPlaceHolders/HabitsEmptyPlaceHolder";
import HabitCard from "../SingleHabitCard";
import { defaultColor } from "@/colors";
import SuccessIcon from "@/app/Assests/SuccessIcon";

function HabitsContainerMiddle() {
  const {
    allHabitsObject,
    selectedAreaStringObject,
    selectedCurrentDayObject,
    allFilteredHabitsObject,
  } = useGlobalContextProivder();
  const { allHabits } = allHabitsObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { selectedAreaString } = selectedAreaStringObject;
  // const [allFilteredHabits, setAllFilteredHabits] = useState<HabitType[]>([]);

  const { allFilteredHabits, setAllFilteredHabits } = allFilteredHabitsObject;

  useEffect(() => {
    // Convert selectedCurrentDate to its proper 3-letter format
    const getThreeLetterDay = getCurrentDayName(selectedCurrentDate)
      .slice(0, 3)
      .toUpperCase(); // Ensure it's in uppercase

    // console.log("Selected day:", getThreeLetterDay);
    console.log(allHabits);

    let filteredHabitsByArea: HabitType[] = [];

    // Filter habits based on frequency
    const filterHabitsByFrequency = allHabits.filter((singleHabit) => {
      return singleHabit.frequency[0].days.includes(getThreeLetterDay);
    });

    // console.log("Filtered habits by frequency:", filterHabitsByFrequency);

    if (selectedAreaString !== "All") {
      filteredHabitsByArea = filterHabitsByFrequency.filter((habit) =>
        habit.areas.some((area) => area.name === selectedAreaString)
      );
    } else {
      filteredHabitsByArea = filterHabitsByFrequency;
    }

    // console.log("Filtered habits by area:", filteredHabitsByArea);

    setAllFilteredHabits(filteredHabitsByArea);
  }, [selectedCurrentDate, allHabits, selectedAreaString]);
  const isAllHabitsCompleted =
    allFilteredHabits.length > 0 &&
    allFilteredHabits.every((habit) => {
      return habit.completedDays.some(
        (day) => day.date === selectedCurrentDate
      );
    });
  return (
    <div className="p-3">
      {allFilteredHabits.length === 0 ? (
        <HabitsEmptyPlaceHolder />
      ) : (
        <>
          {isAllHabitsCompleted && (
            <div className="flex justify-center items-center p-5 flex-col">
              <SuccessIcon color={defaultColor.textColor50} />
              <span className="text-[13px] text-gray-400 w-64 text-center mt-6">{`Great job! You've completed all your habits for today.`}</span>
            </div>
          )}
          {allFilteredHabits.map((singleHabit, singleHabitIndex) => (
            <div key={singleHabitIndex}>
              {singleHabit.completedDays.some(
                (day) => day.date === selectedCurrentDate
              ) === false && <HabitCard singleHabit={singleHabit} />}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// function HabitCard({ singleHabit }: { singleHabit: HabitType }) {
//   const { darkModeObject, allHabitsObject, selectedCurrentDayObject } =
//     useGlobalContextProivder();
//   const { isDarkMode } = darkModeObject;
//   const { allHabits, setAllHabits } = allHabitsObject;
//   const { selectedCurrentDate } = selectedCurrentDayObject;

//   const [checked, setChecked] = useState(
//     singleHabit.completedDays.some((day) => day.date === selectedCurrentDate)
//   );
//   function handleClickedCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
//     const checked = event.target.checked;
//     setChecked(checked);
//     if (checked) {
//       checkHabit();
//     } else {
//       uncheckTheHabit();
//     }
//   }

//   function checkHabit() {
//     const completedDay = {
//       _id: uuidv4(),
//       date: selectedCurrentDate,
//     };

//     const updatedHabits: HabitType = {
//       ...singleHabit,
//       completedDays: [...singleHabit.completedDays, completedDay],
//     };

//     const updateAllHabits: HabitType[] = allHabits.map((habit) => {
//       if (habit._id === updatedHabits._id) {
//         return updatedHabits;
//       } else {
//         return habit;
//       }
//     });
//     setAllHabits(updateAllHabits);
//   }
//   function uncheckTheHabit() {
//     const updateHabits: HabitType = {
//       ...singleHabit,
//       completedDays: singleHabit.completedDays.filter(
//         (day) => day.date !== selectedCurrentDate
//       ),
//     };
//     const updateAllHabits: HabitType[] = allHabits.map((habit) => {
//       if (habit._id === updateHabits._id) {
//         return updateHabits;
//       } else {
//         return habit;
//       }
//     });
//     setAllHabits(updateAllHabits);
//   }
//   return (
//     <div className="flex p-3 items-center justify-between ">
//       <Checkbox
//         icon={<RadioButtonUncheckedIcon />}
//         checkedIcon={<CheckCircleIcon />}
//         onChange={handleClickedCheckbox}
//         checked={checked}
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
//                 icon={singleHabit.icon}
//               />
//               <span className="">{singleHabit.name}</span>
//             </div>
//           </div>
//           {/* Divs for the areas  */}
//           <div className="flex gap-2 mt-2  ">
//             {singleHabit.areas.map((singleArea, index) => (
//               <div
//                 key={index}
//                 style={{
//                   color: isDarkMode
//                     ? darkModeColor.textColor
//                     : defaultColor.textColor,
//                   backgroundColor: isDarkMode
//                     ? defaultColor[50]
//                     : defaultColor[100],
//                 }}
//                 className="p-1 text-white text-[12px] rounded-md px-2"
//               >
//                 <span className={`${isDarkMode ? "" : "text-customRed"}`}>
//                   {singleArea.name}
//                 </span>
//               </div>
//             ))}
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

export default HabitsContainerMiddle;
