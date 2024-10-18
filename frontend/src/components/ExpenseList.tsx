'use client';

import React, { useMemo } from 'react';
import ExpenseItem from './ExpenseItem';
import { BusIcon, CoffeeIcon, TvIcon, UserIcon } from 'lucide-react';
import { Expense } from './ExpenseListGroup';
import { ActionProps } from './ExpenseActionForm';

interface ExpenseListProps {
  date: string;
  expenseList: Expense[];
  action: ActionProps;
  openId: number | null;
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>;
  setAction: React.Dispatch<React.SetStateAction<ActionProps>>;
}

function ExpenseList({
  date,
  expenseList,
  openId,
  setOpenId,
  setAction,
}: ExpenseListProps) {
  const total = useMemo<number>(
    () =>
      expenseList.reduce(
        (total, expense) => (total += parseFloat(expense.amount)),
        0,
      ),
    [expenseList],
  );

  const handleOpenId = (id: number) => {
    setOpenId(openId == id ? null : id);
  };

  const handleIcon = (expense: Expense): JSX.Element => {
    switch (expense?.category?.name) {
      case 'Food':
        return <CoffeeIcon style={{ color: `#${expense?.category?.color}` }} />;
      case 'Transport':
        return <BusIcon style={{ color: `#${expense?.category?.color}` }} />;
      case 'Entertainment':
        return <TvIcon style={{ color: `#${expense?.category?.color}` }} />;
    }
    return <UserIcon style={{ color: `#${expense?.category?.color}` }} />;
  };

  const rows: any[] = [];
  expenseList.forEach((expense) => {
    rows.push(
      <ExpenseItem
        key={expense.eid}
        id={expense.eid}
        onClick={() => handleOpenId(expense.eid)}
        Icon={handleIcon(expense)}
        color={`#${expense?.category?.color}`}
        title={expense.title}
        date={new Date(expense.timestamp)}
        amount={expense.amount}
        setAction={setAction}
        isOpen={openId === expense.eid}
      />,
    );
  });
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[26px]">
      <div className="mr-[115px] flex w-[930px] items-center justify-between">
        <h3 className="text-[22px] font-medium text-black">{date}</h3>
        <h4 className="text-[18px] font-medium text-[#9198AA]">
          Total: ${total}
        </h4>
      </div>
      {rows}
    </div>
  );
}

export default ExpenseList;
