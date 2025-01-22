import React from 'react'
import UserProfile from './RightSideBar/UserProfile'
import MainStatistics from './RightSideBar/MainStatistics'
import Calendar from './RightSideBar/Calendar'
import { useGlobalContextProivder } from '@/app/contextApi';
import { darkModeColor, defaultColor } from '@/colors';
function AllHabitsRightSideBar() {
  
  const {darkModeObject} = useGlobalContextProivder();
  const {isDarkMode} = darkModeObject;
  return (
    <div style={{
      color:isDarkMode?darkModeColor.textColor:defaultColor.textColor,
      backgroundColor:isDarkMode?darkModeColor.background:defaultColor.background}} 
      className=" flex flex-col items-center m-3  p-2 rounded-lg">
        <UserProfile/>
        <MainStatistics/>
        <Calendar/>
    </div>
  )
}

export default AllHabitsRightSideBar