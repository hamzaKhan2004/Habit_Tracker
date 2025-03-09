/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGlobalContextProivder } from "@/app/contextApi";
import Dropdown from "@/app/Dropdown";
import { AreaType } from "@/app/Types/GlobalTypes";
import addNewArea from "@/app/utils/allAreaUtils/addNewArea";
import { darkModeColor, defaultColor } from "@/colors";
import DataFormModal from "@/Modal";
import { useUser } from "@clerk/nextjs";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function AllAreasContainer() {
  const {
    allAreasObject: { allAreas, setAllAreas },
    darkModeObject: { isDarkMode },
    openAreaFormObject: { openAreaForm, setOpenAreaForm },
    selectedItemsObject: { selectedItems },
    openIconWindowObject: { setOpenIconWindow, iconSelected },
  } = useGlobalContextProivder();
  const { user } = useUser();
  const [areaItem, setAreaItem] = useState<AreaType>({
    _id: "",
    icon: faFlask,
    clerkUserId: "",
    name: "",
  });

  //   const [isOpen, setIsOpen] = useState(true);
  function handleOnClose() {
    setOpenAreaForm(!openAreaForm);
  }
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAreaItem({
      ...areaItem,
      name: event.target.value,
    });
  }

  function handleOnClick() {
    if (!selectedItems) {
      if (areaItem.name.trim() === "") {
        return toast.error("The area name field is still empty");
      }

      // Check if the area already exists
      const areaExist = allAreas.some(
        (singleArea) =>
          singleArea.name.toLocaleLowerCase() ===
          areaItem.name.toLocaleLowerCase()
      );

      if (areaExist) {
        toast.error("The area already exists");
        return;
      }

      try {
        // Ensure `clerkUserId` is passed
        addNewArea({
          allAreas,
          setAllAreas,
          areaItem: { ...areaItem, clerkUserId: user?.id || "" }, // Fetch Clerk user ID
        });
        setOpenAreaForm(false);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    if (!openAreaForm) {
      setAllAreas((prevAreaItem) =>
        Array.isArray(prevAreaItem) ? prevAreaItem.map((area) => area) : []
      );
    } else {
      setAreaItem({ ...areaItem, _id: uuidv4() });
    }
  }, [openAreaForm]);

  //change the icon property of the area item when the iconselected changes
  useEffect(() => {
    setAreaItem({ ...areaItem, icon: iconSelected });
  }, [iconSelected]);
  console.log(areaItem);

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="w-full mt-5 p-6 flex flex-col gap-6 rounded-md"
    >
      <Dropdown />
      <DataFormModal
        isOpen={openAreaForm}
        onClose={handleOnClose}
        FormTitle="Add New Area"
        textValue={areaItem.name}
        onChange={handleOnChange}
        onClick={handleOnClick}
      />
      {allAreas.map((singleArea, index) => (
        <div key={index}>
          <AreaCard singleArea={singleArea} />
        </div>
      ))}
    </div>
  );
}

function AreaCard({ singleArea }: { singleArea: AreaType }) {
  const {
    darkModeObject: { isDarkMode },
    openDropDownObject: { setOpenDropDown },
    dropDownPositionsObject: { setDropDownPositions },
    selectedItemsObject: { setSelectedItems },
  } = useGlobalContextProivder();

  function openTheDropDown(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;
    setDropDownPositions({ top, left });
    setSelectedItems(singleArea);
    setOpenDropDown(true);
  }
  console.log(singleArea);
  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
      }}
      className="flex justify-between p-5 rounded-md"
    >
      {/* icons and texts  */}
      <div className="flex items-center gap-4">
        <FontAwesomeIcon
          className="w-5 h-5 text-customRed"
          height={20}
          width={20}
          icon={singleArea.icon}
        />
        <div className="flex flex-col">
          <span className="font-semibold">{singleArea.name}</span>
          <span className="text-gray-400 text-sm">1 Habit</span>
        </div>
      </div>
      <div className="w-10 flex items-center justify-center ">
        {singleArea.name !== "All" && (
          <IconButton onClick={openTheDropDown}>
            <MoreVertIcon sx={{ color: "gray" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
}
