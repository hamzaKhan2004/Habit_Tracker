import React from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProivder } from "@/app/contextApi";
import dayjs, { Dayjs } from "dayjs";

function Calendar() {
  const { darkModeObject, selectedCurrentDayObject, offsetDayObject } =
    useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { setOffsetDay } = offsetDayObject;

  const value: Dayjs | null = selectedCurrentDate
    ? dayjs(selectedCurrentDate)
    : null;

  function handleOnChangeDate(newDate: Dayjs) {
    //convert from the day.js object to javascript date object

    const jsDate = newDate.toDate();
    const currentDate = new Date();

    const differenceInMs = jsDate.getTime() - currentDate.getTime();

    const differenceInDays = differenceInMs / (1000 * 3600 * 24);

    setOffsetDay(Math.floor(differenceInDays + 1));
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
      }}
      className="flex mx-4 flex-col gap-6 justify-center items-center mt-10 bg-slate-50 rounded-xl  pt-7"
    >
      <DateCalendar
        onChange={handleOnChangeDate}
        value={value}
        sx={{
          "& .MuiPickersDay-root": {
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor,
            "&.Mui-selected": {
              backgroundColor: defaultColor.default,
              color: "white",
            },
          },
          "& .MuiPickersYear-yearButton": {
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor,
            "&.Mui-selected": {
              backgroundColor: defaultColor.default,
              color: "white",
            },
          },
        }}
      />
    </div>
  );
}

export default Calendar;
