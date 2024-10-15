'use client';

import { LayoutDashboardIcon, LogOutIcon, ScrollIcon } from 'lucide-react';
import React from 'react';
import NavigationIconComponent from './ui/NavigationIconComponent';
import { useRouter } from 'next/navigation';

function SideNavigation() {
  const router = useRouter();
  const handleLogout = async () => {
      try {
        const response = await fetch('api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
        if (response.ok) {
          router.push('/login');
        } 
      } catch(error) {
        throw error;
      }
  }

  return (
    <div className="fixed left-0 top-0 flex h-screen w-[78px] flex-col justify-between bg-foreground px-[12px] py-[100px] shadow-[0px_2px_2px_rgba(0,_0,_0,_0.15)]">
     <div className='flex flex-col gap-[32px]'>
      <NavigationIconComponent
          href="/"
          Icon={<LayoutDashboardIcon />}
          color="#E9BB73"
          className="text-white"
        />
        <NavigationIconComponent
          href="/expenses"
          Icon={<ScrollIcon />}
          color="#FF9C9C"
          className="text-white"
        />
     </div>
     <NavigationIconComponent
        onClick={handleLogout}
        Icon={<LogOutIcon/>}
        color='#ffffff'
        className='text-red-400 border-[1px] border-gray-300 cursor-pointer'
        />
    </div>
  );
}

export default SideNavigation;
