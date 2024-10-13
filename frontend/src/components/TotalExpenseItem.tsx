'use client';

import { PlusIcon } from 'lucide-react';
import React from 'react';
import ExpenseActionForm, { Action, ActionProps } from './ExpenseActionForm';

interface TotalExpenseItemProps {
  total: number;
  action: ActionProps;
  fetchExpenses: () => Promise<void>;
  setAction: React.Dispatch<React.SetStateAction<ActionProps>>;
}

function TotalExpenseItem({
  total,
  fetchExpenses,
  action,
  setAction,
}: TotalExpenseItemProps) {
  return (
    <>
      {action.open && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-15"
          onClick={() => setAction({ action: Action.none, open: false })}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ExpenseActionForm
              action={action}
              fetchExpenses={fetchExpenses}
              setAction={setAction}
            />
          </div>
        </div>
      )}
      <div className="fixed bottom-10 left-1/2 ml-[40px] flex -translate-x-1/2 items-center gap-[40px]">
        <div className="flex items-center justify-stretch gap-[535px] rounded-[12px] border-2 border-primary-subtle bg-foreground px-[26px] py-[28px] text-black">
          <h3 className="w-[200px] text-[22px] font-bold">Total Expense</h3>
          <h4 className="w-[150px] text-[18px] font-medium">Rs. {total}</h4>
        </div>
        <button
          className="flex size-[73px] items-center justify-center rounded-[12px] bg-primary text-white"
          onClick={() => setAction({ action: Action.create, open: true })}
        >
          <PlusIcon className="size-16" />
        </button>
      </div>
    </>
  );
}

export default TotalExpenseItem;
