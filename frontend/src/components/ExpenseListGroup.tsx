'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ExpenseList from './ExpenseList';
import TotalExpenseItem from './TotalExpenseItem';
import { Action, ActionProps } from './ExpenseActionForm';

export interface Expense {
  eid: number;
  title: string;
  amount: string;
  timestamp: string;
  category: {
    cid: number;
    name: string;
    color: string;
  };
}

export interface Data {
  [key: string]: Expense[];
}

interface ExpenseListGroupProps {
  isExpense?: boolean;
}

function ExpenseListGroup({ isExpense }: ExpenseListGroupProps) {
  const [data, setData] = useState<Data>({});
  const [action, setAction] = useState<ActionProps>({
    action: Action.none,
    open: false,
    eid: -1,
  });
  const [openId, setOpenId] = useState<number | null>(null);

  async function fetchExpenses() {
    try {
      const response = await fetch('api/expense/findAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      const groupedEntries: Data = {};

      data.forEach((expense: Expense) => {
        const date = new Date(expense.timestamp);
        const monthYear = date.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        });

        if (!groupedEntries[monthYear]) {
          groupedEntries[monthYear] = [];
        }

        groupedEntries[monthYear].push(expense);
      });

      setData(groupedEntries);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  const calculateTotal = (data: Data): number => {
    let total = 0;

    for (const month in data) {
      const expenses = data[month];
      expenses.forEach((expense) => {
        const amount = expense.amount;
        total += parseFloat(amount);
      });
    }

    return total;
  };

  const totalExpense = useMemo(() => calculateTotal(data), [data]);

  const sortExpenses = (data: Data): Data => {
    const groupedEntries: Data = {};

    Object.keys(data).forEach((key) => {
      groupedEntries[key] = data[key].sort((a, b) => {
        // sort by days
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
    });

    const sortedKeys = Object.keys(groupedEntries).sort((a, b) => {
      // sort months
      const dateA = new Date(a + ' 1'); // + 1 to set the date
      const dateB = new Date(b + ' 1'); // + 1 to set the date
      return dateB.getTime() - dateA.getTime();
    });

    const sortedGroupedEntries: Data = {};

    sortedKeys.forEach((key) => {
      sortedGroupedEntries[key] = groupedEntries[key];
    });

    return sortedGroupedEntries;
  };

  const sortedExpenses = useMemo(() => sortExpenses(data), [data]);

  return (
    <div className="flex flex-col gap-[37px]">
      {Object.entries(sortedExpenses).map(([month, expenses]) => {
        return (
          <ExpenseList
            key={month}
            date={month}
            expenseList={expenses}
            action={action}
            openId={openId}
            setOpenId={setOpenId}
            setAction={setAction}
          />
        );
      })}
      {isExpense && (
        <TotalExpenseItem
          total={totalExpense}
          action={action}
          fetchExpenses={fetchExpenses}
          setAction={setAction}
        />
      )}
    </div>
  );
}

export default ExpenseListGroup;
