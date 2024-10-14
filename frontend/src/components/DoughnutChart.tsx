import React from 'react'
import { Doughnut } from 'react-chartjs-2';

interface DoughnutChartProps {
    sortedExpenses: number[],
    totalExpense: number
}

function DoughnutChart({sortedExpenses, totalExpense}: DoughnutChartProps) {
    const data = {
        labels: ['Food', 'Transport', 'Entertainment'],
        datasets: [
          {
            label: "Total",
            data: sortedExpenses,
            backgroundColor: [
              "#4ade80",
              "#A1FE4A",
              "#0495D3"
            ],
            hoverOffset: 4,
          }
        ]
      };
      
      const options = {
        elements: {
          arc: {
            weight: 0.5,
            borderWidth: 3,
          },
        },
        cutout: 60,
      }
    
  return (
<div className='container flex flex-col gap-[16px] pt-[30px] p-[20px] w-[306px] h-[333px] bg-foreground rounded-[12px] shadow-[0px_2px_2px_rgba(0,_0,_0,_0.25)'>
        <h3 className='text-[26px] font-bold text-black'>Expense</h3>
        <div className='relative z-10 size-[200px] mx-auto'>
          <Doughnut data={data} options={options}/>
          <div className='absolute -z-10 left-1/2 -translate-x-1/2 top-[54%] -translate-y-1/2 flex flex-col gap-[5px] items-center'>
            <h4 className='text-[18px] font-bold text-[#FF6E6E]'>Rs. {totalExpense}</h4>
            <h4 className='text-[16px] font-bold text-black'>Total</h4>
          </div>
        </div>
      </div>
        )
}

export default DoughnutChart