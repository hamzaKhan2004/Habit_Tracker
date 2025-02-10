import { useGlobalContextProivder } from "@/app/contextApi";
import { AreaType } from "@/app/Types/GlobalTypes";
import { darkModeColor, defaultColor } from "@/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

function AreasContainer() {
  const { allAreasObject, darkModeObject, selectedAreaStringObject } =
    useGlobalContextProivder();
  const { allAreas } = allAreasObject;
  const { isDarkMode } = darkModeObject;
  const { setSelectedAreaString } = selectedAreaStringObject;

  //state to keep track of selected area
  const [selectedAreas, setSelectedAreas] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleSelection = (index: number) => {
    const selectedAreasCopy = { ...selectedAreas };
    Object.keys(selectedAreasCopy).forEach((key) => {
      selectedAreasCopy[parseInt(key)] = false;
    });

    selectedAreasCopy[index] = true;

    setSelectedAreaString(allAreas[index].name);

    setSelectedAreas(selectedAreasCopy);
  };

  useEffect(() => {
    const initialSelectedArea: { [key: number]: boolean } = {};

    allAreas.forEach((_, index) => {
      initialSelectedArea[index] = false;
    });

    initialSelectedArea[0] = true;
    setSelectedAreas(initialSelectedArea);
  }, [allAreas]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="p-5 bg-white rounded-md flex gap-3 items-center transition-all mt-5 text-sm"
    >
      {allAreas.map((area: AreaType, index) => (
        <div key={index} onClick={() => toggleSelection(index)}>
          <SingleAreaContainer
            singleArea={area}
            isSelected={selectedAreas[index]}
          />
        </div>
      ))}
    </div>
  );
}

function SingleAreaContainer({
  singleArea,
  isSelected,
}: {
  singleArea: AreaType;
  isSelected: boolean;
}) {
  //   console.log(isSelected);
  return (
    <div
      className={`p-2 px-3 rounded-md flex gap-1 items-center cursor-pointer ${
        isSelected ? "bg-customRed text-white" : "text-gray-400"
      }`}
    >
      <FontAwesomeIcon icon={singleArea.icon} />
      <span>{singleArea.name}</span>
    </div>
  );
}

export default AreasContainer;
