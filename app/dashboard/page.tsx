"use client";

import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/SideBar/Sidebar';
import { useGlobalContextProivder } from '../contextApi';
import { menuItemType } from '../Types/MenuItemType';
import AllHabits from '../Pages/AllHabits/AllHabits';
import Statistics from '../Pages/Statistics/Statistics';
import Areas from '../Pages/Areas/Areas';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { darkModeColor, defaultColor } from '@/colors';


function Dashboard() {
  const {menuItemObject} = useGlobalContextProivder();
  const {darkModeObject} = useGlobalContextProivder();
  const {isDarkMode} = darkModeObject;
  const {menuItems} = menuItemObject;
  const [selectedMenu,setSelectedMenu] = useState<menuItemType | null >(null);
  
  let selectComponent = null;
  useEffect(()=>{
    menuItems.map((singleItem)=>{
      if (singleItem.isSelected) {
        setSelectedMenu(singleItem)
      }
    })
  },[menuItems]);
  switch (selectedMenu?.name){
    case "All Habits":
      selectComponent=<AllHabits/>
      break;
    case "Statistics":
      selectComponent=<Statistics/>
      break;
    case "Areas":
      selectComponent=<Areas/> 
      break;
    case "All Areas":
      break;
  }  
  return (
    <div style={{
      backgroundColor:isDarkMode?darkModeColor.backgroundSlate:defaultColor.backgroundSlate}}
      className='flex '>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Sidebar/>
          {selectComponent}
          <BlackSoftLayer/>
        </LocalizationProvider>
    </div>
  )
}
export default Dashboard;

function BlackSoftLayer(){
  const {openSideBarObject} = useGlobalContextProivder();
  const {openSideBar} = openSideBarObject;
  return (
    <div className={`w-full h-full bg-black fixed top-0 left-0 opacity-20 z-40 ${openSideBar?"fixed":"hidden"}`}></div>
  )
}