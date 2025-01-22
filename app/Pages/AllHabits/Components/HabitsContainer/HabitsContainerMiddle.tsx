import React from 'react';
import { Checkbox, IconButton } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { darkModeColor, defaultColor } from '@/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useGlobalContextProivder } from '@/app/contextApi';

function HabitsContainerMiddle() {
  return (
    <div className="  p-3">
      <HabitCard />
      <HabitCard />
      <HabitCard />
    </div>
  );
}

// const defaultColor = {
//   default: "#FF5722", // Replace with your desired default color
// };

function HabitCard() {
  
  const {darkModeObject} = useGlobalContextProivder();
  const {isDarkMode} = darkModeObject;
  return (
    <div className="flex p-3 items-center justify-between ">
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        sx={{
          color: defaultColor.default,
          "&.Mui-checked": {
            color: defaultColor.default,
          },
        }}
      />

        <div style={{backgroundColor:isDarkMode?darkModeColor.backgroundSlate:defaultColor.backgroundSlate}} 
          className="flex justify-between gap-2 w-full p-3 py-4 rounded-md bg-slate-50  ">
            <div className="  w-full">
                {/* Divs for the icon and the name of the habit  */}
                <div className="flex gap-2 justify-between  ">
                    <div className="flex gap-2 items-center">
                    <FontAwesomeIcon className='p-3 rounded-full w-4 h-4 bg-customRed text-white' height={20} width={20} icon={faCode} />
                    <span className="">Coding</span>
                    </div>
                </div>
                {/* Divs for the areas  */}
                <div className="flex gap-2 mt-2  ">
                    <div style={{
                      color:isDarkMode?darkModeColor.textColor:defaultColor.textColor,
                      backgroundColor:isDarkMode?defaultColor[50]:defaultColor[100]}}
                      className="p-1 text-white text-[12px] rounded-md px-2">
                        <span className='text-customRed'>Area1</span>
                    </div>
                    
                    <div style={{
                      color:isDarkMode?darkModeColor.textColor:defaultColor.textColor,
                      backgroundColor:isDarkMode?defaultColor[50]:defaultColor[100]}}
                       className="p-1 text-white text-[12px] rounded-md px-2">
                        <span className='text-customRed'>Area2</span>
                    </div>
                </div>
            </div>
            <div className="w-10 flex items-center justify-center">
              <IconButton>
                <MoreVertIcon sx={{color:isDarkMode?"white":"gray"}}/>
              </IconButton>
            </div>
        </div>

    </div>
  );
}

export default HabitsContainerMiddle;
