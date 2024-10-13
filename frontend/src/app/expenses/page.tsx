import ExpenseListGroup from '@/components/ExpenseListGroup';
import SideNavigation from '@/components/SideNavigation';
import React from 'react';

function ExpensePage() {
  return (
    <>
      <SideNavigation />
      <div className="mb-[160px] ml-[80px] mt-[60px]">
        <ExpenseListGroup />
      </div>
    </>
  );
}

export default ExpensePage;
