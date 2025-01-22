import { useGlobalContextProivder } from '@/app/contextApi';
import { darkModeColor, defaultColor } from '@/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

function DarkMode() {
  const { darkModeObject } = useGlobalContextProivder();
  const { isDarkMode, setDarkMode, darkModeItems, setDarkModeItems } = darkModeObject;

  useEffect(() => {
    // Retrieve dark mode preference from localStorage
    const storedDarkMode = localStorage.getItem('isDarkMode');
    if (storedDarkMode !== null) {
      const darkModeEnabled = JSON.parse(storedDarkMode);
      setDarkMode(darkModeEnabled);
      const updatedItems = darkModeItems.map((item) =>
        item.id === (darkModeEnabled ? 2 : 1)
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      );
      setDarkModeItems(updatedItems);
    }
  }, []); // Run only once on component mount


  function handleClickedItem(singleItemIndex: number) {
    const updatedDarkModeItems = darkModeItems.map((darkModeItem, index) => {
      if (singleItemIndex === index) return { ...darkModeItem, isSelected: true };

      return { ...darkModeItem, isSelected: false };
    });

    setDarkModeItems(updatedDarkModeItems);
  }

  useEffect(() => {
    darkModeItems.forEach((singleItem) => {
      if (singleItem.id === 1 && singleItem.isSelected) setDarkMode(false);
      if (singleItem.id === 2 && singleItem.isSelected) setDarkMode(true);
    });
  }, [darkModeItems]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
      }}
      className="w-[90px] relative rounded-3xl flex"
    >
      {darkModeItems.map((singleItem, singleItemIndex) => (
        <div
          className="h-full w-[45px] z-40 flex justify-center items-center"
          onClick={() => handleClickedItem(singleItemIndex)}
          key={singleItemIndex}
        >
          <FontAwesomeIcon
            className={`${
              singleItem.isSelected ? 'text-customRed' : 'text-gray-300'
            } cursor-pointer`}
            icon={singleItem.icon}
            width={20}
            height={20}
          />
        </div>
      ))}
      <div
        style={{
          backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background,
        }}
        className={`w-[38px] absolute h-[38px] top-1 transform ${
          isDarkMode ? 'translate-x-[48px]' : 'translate-x-1'
        } rounded-full bg-white transition-all`}
      ></div>
    </div>
  );
}

export default DarkMode;
