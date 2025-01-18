"use client";

import React from 'react'
import { SignOutButton,useUser } from '@clerk/nextjs';
function Dashboard() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useUser();
  return (
    <div className='flex justify-center mt-52'>
        hello, {user?.lastName} {" "} 
        <span className={`block  sm:w-32 w-full  border rounded-lg px-9 py-3 transition text-sm font-medium hover:bg-customRed hover:text-white  focus:outline-none border-customRed text-customRed`}>
        <SignOutButton>SignOut</SignOutButton>
        </span>
    </div>
  )
}

export default Dashboard;