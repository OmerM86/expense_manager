import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface DoughnutChartProps {
  sortedExpenses: number[];
  totalExpense: number;
}

function DoughnutChart({ sortedExpenses, totalExpense }: DoughnutChartProps) {
  const data = {
    labels: ['Food', 'Transport', 'Entertainment'],
    datasets: [
      {
        label: 'Total',
        data: sortedExpenses,
        backgroundColor: ['#4ade80', '#A1FE4A', '#0495D3'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    elements: {
      arc: {
        weight: 0.5,
        borderWidth: 3,
      },
    },
    cutout: 60,
  };

  return (
    <div className="shadow-[0px_2px_2px_rgba(0,_0,_0,_0.25) container flex h-[333px] w-[306px] flex-col gap-[16px] rounded-[12px] bg-foreground p-[20px] pt-[30px]">
      <h3 className="text-[26px] font-bold text-black">Expense</h3>
      <div className="relative z-10 mx-auto size-[200px]">
        <Doughnut data={data} options={options} />
        <div className="absolute left-1/2 top-[54%] -z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[5px]">
          <h4 className="text-[18px] font-bold text-[#FF6E6E]">
            Rs. {totalExpense}
          </h4>
          <h4 className="text-[16px] font-bold text-black">Total</h4>
        </div>
      </div>
    </div>
  );
}

export default DoughnutChart;
