import { LayoutDashboardIcon, ScrollIcon } from 'lucide-react';
import React from 'react';
import NavigationIconComponent from './ui/NavigationIconComponent';

function SideNavigation() {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-[78px] flex-col gap-[32px] bg-foreground px-[12px] py-[100px] shadow-[0px_2px_2px_rgba(0,_0,_0,_0.15)]">
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
  );
}

export default SideNavigation;
