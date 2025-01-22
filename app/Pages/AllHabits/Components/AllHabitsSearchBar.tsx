import { useGlobalContextProivder } from '@/app/contextApi'
import { darkModeColor, defaultColor } from '@/colors';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function AllHabitsSearchBar() {
  const {darkModeObject} = useGlobalContextProivder();
  const {isDarkMode} = darkModeObject;
  return (
    <div className='w-[75%]'>
        <div style={{backgroundColor:isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate}} className="flex gap-3 items-center p-3  rounded-3xl">
            <FontAwesomeIcon height={20} width={20} icon={faSearch} className='text-gray-300'/>
            <input style={{backgroundColor:isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate}} className={`outline-none text-[14px] font-light  w-full`} placeholder='Search...' />
        </div>
    </div>
  )
}

export default AllHabitsSearchBar