import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers'; 
import { darkModeColor, defaultColor } from '@/colors'; 
import { useGlobalContextProivder } from '@/app/contextApi';

function Calendar() {
  
  const {darkModeObject} = useGlobalContextProivder();
  const {isDarkMode} = darkModeObject;
  return (
    <div style={{backgroundColor:isDarkMode?darkModeColor.backgroundSlate:defaultColor.backgroundSlate}} className="flex mx-4 flex-col gap-6 justify-center items-center mt-10 bg-slate-50 rounded-xl  pt-7">
      <DateCalendar
        sx={{
          "& .MuiPickersDay-root": {
            color: isDarkMode
                ? darkModeColor.textColor 
                :defaultColor.textColor, 
                "&.Mui-selected":{
                  backgroundColor: defaultColor.default,
                  color:"white"
                }
          },
          "& .MuiPickersYear-yearButton": {
            color: isDarkMode
                ? darkModeColor.textColor 
                :defaultColor.textColor, 
                "&.Mui-selected":{
                  backgroundColor: defaultColor.default,
                  color:"white"
                },
          },
        }}
      />
    </div>
  );
}

export default Calendar;
