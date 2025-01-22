"use client";

import React, { ReactNode, useContext, useState,createContext } from 'react'
import {GlobalContextType} from './Types/GlobalContextType';
import {menuItemType} from './Types/MenuItemType';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { faChartSimple, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { DarkModeItem } from './Types/DarkModeType';

// GlobalContextType
// MenuItemType

const GlobalContext = createContext<GlobalContextType>({
  menuItemObject:{
    menuItems:[],
    setMenuItems:()=>{},
  },
  openSideBarObject:{
    openSideBar:false,
    setOpenSideBar:()=>{}
  },
  darkModeObject: { isDarkMode:false, setDarkMode:()=>{}, darkModeItems:[],setDarkModeItems:()=>{}},
})

function GlobalContextProvider({children}:{children:ReactNode}){
  const [menuItems,setMenuItems] = useState<menuItemType[]>([
    {name:"All Habits",isSelected:true,icon:faRectangleList},
    {name:"Statistics",isSelected:false,icon:faChartSimple},
    {name:"Areas",isSelected:false,icon:faLayerGroup},
  ])
    const [darkModeItems,setDarkModeItems] = useState<DarkModeItem[]>([
    {id:1,icon:faSun,isSelected:true},
    {id:2,icon:faMoon,isSelected:false},
  ])
  const [openSideBar, setOpenSideBar] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);


  return (
    <GlobalContext.Provider 
      value={{
          menuItemObject:{menuItems,setMenuItems},
          openSideBarObject: { openSideBar, setOpenSideBar },
          darkModeObject: { 
            isDarkMode,
            setDarkMode,
            darkModeItems,
            setDarkModeItems,
            },}}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContextProivder(){
  return useContext(GlobalContext)
}

export default GlobalContextProvider;