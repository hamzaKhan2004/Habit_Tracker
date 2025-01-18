"use client";

import React from 'react'
import { SignOutButton,useUser } from '@clerk/nextjs';
function Dashboard() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useUser();
  return (
    <div>
        hello, {user?.lastName} {" "} <SignOutButton>SignOut</SignOutButton>
    </div>
  )
}

export default Dashboard;