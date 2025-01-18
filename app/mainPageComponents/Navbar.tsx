"use client";
import React from 'react'
import AppIcon from '../SVG_Icons/AppIcon';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

function Navbar() {
  const {userId} = useAuth();
  const defaultColor = "#d90429";
  const backgroundColorObject = {backgroundColor:defaultColor}
    return (
        <header>
            <div className="p-8 px-20">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left mb-7 sm:mb-0">
                        {/* {Icon + Name of the app} */}
                        <div className="flex gap-2 items-center sm:justify-start justify-center">
                            <span className='text-2xl font-light flex items-center gap-2'>
                                    {/* the icon  */}
                                <div style={backgroundColorObject} className="p-2 rounded-md">
                                    <AppIcon color='#ffffff' height='34' width='34'/>
                                </div>
                                <span style={{color:"#d90429"}} className='font-bold text-mainColor'>
                                    Habit
                                </span>
                                <span  className='font-light text-black'>
                                    tracker
                                </span>
                            </span>
                        </div>
                    </div>
                    {/* The buttons  */}
                    {
                        userId?(
                            <Link href={"/dashboard"}>
                                <button style={backgroundColorObject} className={`block sm:w-32 w-full text-center rounded-lg px-6 py-3 text-sm font-medium text-white transition focus:outline-none`}
                                    type='button'>
                                    Dashboard
                                </button>
                            </Link>
                        ):(
                            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                                <Link href={"/sign-in"}>
                                <button style={backgroundColorObject} className={`block sm:w-32 w-full rounded-lg px-9 py-3 text-sm font-medium text-white transition focus:outline-none`}
                                    type='button'>
                                    Sign In
                                </button>
                                </Link>

                                <Link href={"/sign-up"}>
                                <button className={`block sm:w-32 w-full  border rounded-lg px-9 py-3 transition text-sm font-medium hover:bg-customRed hover:text-white  focus:outline-none border-customRed text-customRed`}
                                    type='button'>
                                    Sign UP 
                                </button>
                                </Link>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </header>
  )
}


export default Navbar;