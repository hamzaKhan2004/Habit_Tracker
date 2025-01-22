import React from 'react'
import AppIcon from '../SVG_Icons/AppIcon';
import { defaultColor } from '@/colors';

function LogoAnName() {
    
  const backgroundColorObject = {backgroundColor:defaultColor}
  return (
    <div className="flex gap-2 items-center sm:justify-start justify-center">
                            <span className='text-2xl font-light flex items-center gap-2'>
                                    {/* the icon  */}
                                <div style={backgroundColorObject} className="p-2 rounded-md">
                                    <AppIcon color='#ffffff' height='34' width='34'/>
                                </div>
                                <span style={{color:"#d90429"}} className='font-bold text-mainColor'>
                                    Habit
                                </span>
                                <span  className='font-light'>
                                    tracker
                                </span>
                            </span>
                        </div>
  )
}

export default LogoAnName