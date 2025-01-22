import React from 'react'
import { useGlobalContextProivder } from '@/app/contextApi'
import { menuItemType } from '@/app/Types/MenuItemType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// useGlobalContextProivder

function MenuSelection() {
    const {menuItemObject} = useGlobalContextProivder();
    const {menuItems} = menuItemObject;
    
  return (
    <div className='mt-[150px]'>{
        menuItems.map((menuItem:menuItemType,menuItemIndex:number)=>(
            <div key={menuItemIndex}><SingleMenuItem menuItemProp={menuItem}/></div>
        ))
    }</div>
  )
}

function SingleMenuItem({menuItemProp}:{menuItemProp:menuItemType}){
  const {menuItemObject} = useGlobalContextProivder();
  const {menuItems,setMenuItems} = menuItemObject;
  function handleClicedItem(){
    const copyMenuItems = menuItems.map((menuItem)=>{
      if (menuItemProp.name === menuItem.name) {
        return {...menuItem,isSelected:true}
      }
      return {...menuItem,isSelected:false}
    })
    setMenuItems(copyMenuItems)
  }
  
  return (
    <div onClick={handleClicedItem} className={`flex gap-2 items-center p-2 mb-3 ml-8 cursor-pointer rounded-md w-36 ${menuItemProp.isSelected ? "bg-customRed text-white": "" }`}>
      <FontAwesomeIcon className='' icon={menuItemProp.icon} width={20} height={20}/>
      <div className="">{menuItemProp.name}</div>
    </div>
  )
}

export default MenuSelection