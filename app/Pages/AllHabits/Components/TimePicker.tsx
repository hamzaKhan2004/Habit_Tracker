/* eslint-disable react-hooks/exhaustive-deps */
import { useGlobalContextProivder } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

function TimePicker({
  onSaveTime,
}: {
  onSaveTime: (timeValue: string) => void;
}) {
  //Constants
  const { darkModeObject, openTimePickerObject } = useGlobalContextProivder();
  const { isDarkMode } = darkModeObject;
  const { openTimePickerWindow, setOpenTimePickerWindow } =
    openTimePickerObject;

  //Time values HH:MM
  const [timeValues, setTimeValues] = useState([
    { text: "11", isSelected: true },
    { text: "12", isSelected: false },
  ]);
  //Meridiem
  const [meridiem, setMeridiem] = useState([
    { text: "AM", isSelected: true },
    { text: "PM", isSelected: false },
  ]);

  //Ref
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);

  //functions
  function updateMeridiemFx(clickedIndex: number) {
    const updateMeridiem = meridiem.map((singleMeridiem, index) => {
      if (index === clickedIndex) {
        return { ...singleMeridiem, isSelected: true };
      }
      return { ...singleMeridiem, isSelected: false };
    });
    setMeridiem(updateMeridiem);
  }

  //update the timesValues variable
  function updateTimeValues(clickedIndex: number) {
    const updateTimeValues = timeValues.map((sigleTimeValue, index) => {
      if (index === clickedIndex)
        return { ...sigleTimeValue, isSelected: true };
      return { ...sigleTimeValue, isSelected: false };
    });
    setTimeValues(updateTimeValues);
  }

  function updateTimeValuesText(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const timesValuesCopy = [...timeValues];
    const currentText = event.target.value;
    const parsedValue = parseInt(currentText, 10);

    //check if the input consists of only digits
    const isNumeric = /^\d*$/.test(currentText);
    function isValidInput(
      currentText: string,
      parsedValue: number,
      index: number
    ) {
      if (
        (index === 0 &&
          currentText.length <= 2 &&
          parsedValue >= 0 &&
          parsedValue <= 12) ||
        (index === 1 &&
          currentText.length <= 2 &&
          parsedValue >= 0 &&
          parsedValue <= 59) ||
        currentText === ""
      ) {
        return true;
      }
      return false;
    }
    if (isNumeric && isValidInput(currentText, parsedValue, index)) {
      timesValuesCopy[index].text = currentText;
      setTimeValues(timesValuesCopy);
    }
  }

  //Handle the exit of each input
  function handleOnBlur(index: number) {
    const timesValuesCopy = [...timeValues];
    const currentText = timesValuesCopy[index].text;

    if (currentText === "") {
      timesValuesCopy[index].text = "00";
    } else if (currentText.length === 1) {
      timesValuesCopy[index].text = "0" + currentText;
    }
    setTimeValues(timesValuesCopy);
  }

  //save the time in a formatted text
  function saveTime() {
    const meridiemSelected = meridiem.filter(
      (singleMeridiem) => singleMeridiem.isSelected
    )[0].text;
    const selectedTimeFormatted =
      timeValues[0].text + ":" + timeValues[1].text + " " + meridiemSelected;
    onSaveTime(selectedTimeFormatted);
    setOpenTimePickerWindow(false);
  }

  //useEffect hooks

  useEffect(() => {
    if (openTimePickerWindow) {
      if (timeValues[0].isSelected) {
        hoursRef.current?.focus();
      } else if (timeValues[1].isSelected) {
        minutesRef.current?.focus();
      }
    }
  }, [openTimePickerWindow]);

  useEffect(() => {
    function getCurrentTime() {
      const now = new Date();
      let currentHour = now.getHours();
      const currentMinutes = now.getMinutes().toString().padStart(2, "0");
      const AmPm = currentHour >= 12 ? "PM" : "AM";

      //Convert hours from 24-hour format to 12-hour format
      currentHour = currentHour % 12;
      currentHour = currentHour ? currentHour : 12;
      const formattedHour = currentHour.toString().padStart(2, "0");

      //Update the timeValues
      const timeValuesCopy = [...timeValues];
      timeValuesCopy[0].text = formattedHour;
      timeValuesCopy[1].text = currentMinutes;
      setTimeValues(timeValuesCopy);

      const copyMeridiem = meridiem.map((singleMeridiem) => {
        if (singleMeridiem.text === AmPm) {
          return { ...singleMeridiem, isSelected: true };
        }
        return { ...singleMeridiem, isSelected: false };
      });
      setMeridiem(copyMeridiem);
    }
    getCurrentTime();
  }, [openTimePickerWindow]);
  //   console.log(timeValues);

  //jsx
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "",
        color: isDarkMode ? "white" : "",
      }}
      className={`bg-white text-black w-[90%] sm:w-[413px] top-[89px] left-1/2 transform -translate-x-1/2 z-50 p-5 sm:p-7 rounded-md shadow-md ${
        isDarkMode ? "shadow-sm shadow-gray-50" : ""
      } ${openTimePickerWindow ? "absolute" : "hidden"}`}
    >
      {/* Header: Select Time + Close Icon */}
      <span className={`font-bold flex justify-between items-center`}>
        <span>Select Time</span>
        <FontAwesomeIcon
          height={20}
          width={20}
          className={`text-gray-300 cursor-pointer`}
          onClick={() => setOpenTimePickerWindow(false)}
          icon={faClose}
        />
      </span>

      {/* Input Fields Section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 sm:mt-9 items-center justify-center">
        {/* Time Inputs: Hours and Minutes */}
        <div className="flex gap-2 justify-center items-center">
          <input
            value={timeValues[0].text}
            onClick={() => updateTimeValues(0)}
            ref={hoursRef}
            onChange={(event) => updateTimeValuesText(event, 0)}
            onBlur={() => handleOnBlur(0)}
            readOnly={!timeValues[0].isSelected}
            style={{
              backgroundColor: isDarkMode
                ? timeValues[0].isSelected
                  ? "#D90429"
                  : defaultColor[50]
                : timeValues[0].isSelected
                ? defaultColor[100]
                : defaultColor.backgroundSlate,
              color: isDarkMode
                ? "white"
                : timeValues[0].isSelected
                ? defaultColor.default
                : defaultColor.textColorGray,
            }}
            className="w-[80px] sm:w-[100px] text-[32px] sm:text-[45px] p-2 sm:p-4 rounded-md text-center outline-none"
          />

          <span className="text-2xl font-bold">:</span>

          <input
            value={timeValues[1].text}
            onClick={() => updateTimeValues(1)}
            ref={minutesRef}
            onChange={(event) => updateTimeValuesText(event, 1)}
            onBlur={() => handleOnBlur(1)}
            readOnly={!timeValues[1].isSelected}
            style={{
              backgroundColor: isDarkMode
                ? timeValues[1].isSelected
                  ? "#D90429"
                  : defaultColor[50]
                : timeValues[1].isSelected
                ? defaultColor[100]
                : defaultColor.backgroundSlate,
              color: isDarkMode
                ? "white"
                : timeValues[1].isSelected
                ? defaultColor.default
                : defaultColor.textColorGray,
            }}
            className="w-[80px] sm:w-[100px] text-[32px] sm:text-[45px] p-2 sm:p-4 rounded-md text-center outline-none"
          />
        </div>

        {/* AM / PM Toggle */}
        <div className="flex sm:flex-col gap-3">
          {meridiem.map((singleMeridiem, index) => (
            <span
              key={index}
              onClick={() => updateMeridiemFx(index)}
              style={{
                backgroundColor: isDarkMode
                  ? singleMeridiem.isSelected
                    ? "#D90429"
                    : defaultColor[50]
                  : singleMeridiem.isSelected
                  ? defaultColor[100]
                  : defaultColor.backgroundSlate,
                color: isDarkMode
                  ? "white"
                  : singleMeridiem.isSelected
                  ? defaultColor.default
                  : defaultColor.textColorGray,
              }}
              className="text-md sm:text-xl flex justify-center items-center w-[60px] sm:w-[104px] h-[45px] rounded-md cursor-pointer select-none"
            >
              {singleMeridiem.text}
            </span>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={saveTime}
        className="bg-customRed p-2 sm:p-3 text-white w-full rounded-md mt-6 sm:mt-10 mb-1"
      >
        Save
      </button>
    </div>
  );
}

export default TimePicker;
