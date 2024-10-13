import React from 'react';
import BadgeIconComponent from './ui/BadgeIconComponent';
import { EllipsisIcon, XIcon } from 'lucide-react';
import { formatDate, hexToRgba } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';
import { Action, ActionProps } from './ExpenseActionForm';

interface ExpenseItemProps {
  id: number;
  Icon: JSX.Element;
  color: string;
  title: string;
  date: Date;
  amount: string;
  isOpen: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  setAction: React.Dispatch<React.SetStateAction<ActionProps>>;
}

function ExpenseItem({
  id,
  Icon,
  color,
  title,
  date,
  amount,
  onClick,
  setAction,
  isOpen,
}: ExpenseItemProps) {
  return (
    <div className="flex gap-[16px]">
      <div className="shadow-[0px_2px_2px_rgba(0,_0,_0,_0.25) flex w-[930px] items-center justify-between rounded-[12px] bg-foreground px-[26px] py-[28px]">
        <div className="flex items-center gap-[32px]">
          <BadgeIconComponent Icon={Icon} color={hexToRgba(color, '0.25')} />
          <div className="flex flex-col justify-center">
            <h3 className="text-[22px] font-medium text-black">{title}</h3>
            <h4 className="text-[18px] font-medium text-[#9198AA]">
              {formatDate(date)}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-[32px]">
          <h2 className="text-[18px] font-medium text-black">Rs. {amount}</h2>
          <BadgeIconComponent
            Icon={
              isOpen ? (
                <XIcon style={{ color: '#9198AA' }} />
              ) : (
                <EllipsisIcon style={{ color: '#9198AA' }} />
              )
            }
            color="#f2f1f7"
            onClick={onClick}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div
        className={twMerge(
          'flex h-[128px] w-[100px] flex-col items-center justify-center gap-[18px] rounded-[8px] bg-foreground text-[14px] text-[#9198AA] shadow-[0px_2px_2px_rgba(0,_0,_0,_0.25)]',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      >
        <button
          className="hover:text-black"
          onClick={() =>
            setAction({ action: Action.view, open: true, eid: id })
          }
        >
          View
        </button>
        <button
          className="hover:text-black"
          onClick={() =>
            setAction({ action: Action.edit, open: true, eid: id })
          }
        >
          Edit
        </button>
        <button
          className="hover:text-black"
          onClick={() =>
            setAction({ action: Action.delete, open: true, eid: id })
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
