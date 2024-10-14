import React from 'react'
import { SortExpense } from './Dashboard';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
    sortedMonths: string[],
    sortedExpenses: SortExpense
    totalExpense: number
}


function BarChart({sortedMonths, sortedExpenses, totalExpense}: BarChartProps) {
    const bardata = {
        labels: sortedMonths,
        datasets: [
          {
            label: "Food",
            data: sortedExpenses.food,
            backgroundColor: ["#4ade80"],
            barThickness: 30,
          },
          {
            label: "Transport",
            data: sortedExpenses.transport,
            backgroundColor: ["#A1FE4A"],
            barThickness: 30,
          },
          {
            label: "Entertainment",
            data: sortedExpenses.entertainment,
            backgroundColor: ["#0495D3"],
            barThickness: 30,
          },
        ]
      };
    
      const options = {
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            beginAtZero: true,
            ticks: {
              stepSize: Math.ceil(totalExpense / 10),
              max: totalExpense,
            },
          }
        },
      };
    return (
        <div className='w-[715px] h-[333px] flex items-center bg-foreground rounded-[12px] shadow-[0px_2px_2px_rgba(0,_0,_0,_0.25)'>
          <div className='w-[690px] h-[292px] flex justify-center'>
            <Bar data={bardata} options={options}/>
          </div>
        </div>
    )
}

export default BarChart