'use client';

import { ArcElement, BarElement, CategoryScale, Chart, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useMemo, useState } from 'react'
import { Data, Expense } from './ExpenseListGroup';
import DoughnutChart from './DoughnutChart';
import BarChart from './BarChart';

export interface SortExpense {
  food: number[],
  transport: number[],
  entertainment: number[]
}

function Dashboard() {
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Title,
  );

  const [data, setData] = useState<Data>({});
  
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

  const getSortedTotalExpenses = (data: Data) => {
    let food: number = 0, transport: number = 0, entertainment: number = 0;

    for (const month in data) {
      const expenses = data[month];
      expenses.forEach((expense) => {
          switch(expense.category.name) {
            case "Food":
              food += parseFloat(expense.amount);
              break;
            case "Transport":
              transport += parseFloat(expense.amount);
              break;
            case "Entertainment":
              entertainment += parseFloat(expense.amount);
              break;
          }
      });
    }
    return [food, transport, entertainment];
  };
  
  const sortMonths = (data: Data): string[]=> {
    const months: string[] = [];
    for (const month in data) {
      months.push(month.split(' ')[0])
    }
    return months;
  };
 
  const sortExpenses = (data: Data) => {
    const expenses: SortExpense = {
      food: [],
      transport: [],
      entertainment: []
    };

    for (const month in data) {
      const food: number[] = [], transport: number[] = [], entertainment: number[] = [];
      data[month].forEach((expense) => {
        switch(expense.category.name) {
          case "Food":
            food.push(parseFloat(expense.amount));
            break;
          case "Transport":
            transport.push(parseFloat(expense.amount));
            break;
          case "Entertainment":
            entertainment.push(parseFloat(expense.amount));
            break;
        }
      });
      expenses.food.push(food.reduce((sum, value) => sum + value, 0));
      expenses.transport.push(transport.reduce((sum, value) => sum + value, 0));
      expenses.entertainment.push(entertainment.reduce((sum, value) => sum + value, 0));
    }

    return expenses;
  } 

  const totalExpense = useMemo(() => calculateTotal(data), [data]);
  const sortedTotalExpenses = useMemo(() => getSortedTotalExpenses(data), [data]);
  const sortedMonths = useMemo(() => sortMonths(data), [data]);
  const sortedExpenses = useMemo(() => sortExpenses(data), [data])

  return (
    <div className="flex h-full w-full items-center justify-between pl-11 pr-[160px] gap-[26px] text-black">
      <DoughnutChart sortedExpenses={sortedTotalExpenses} totalExpense={totalExpense}/>
      <BarChart sortedMonths={sortedMonths} sortedExpenses={sortedExpenses} totalExpense={totalExpense} />
    </div>
  )
}

export default Dashboard