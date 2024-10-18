'use client';

import { ChevronsUpDownIcon } from 'lucide-react';
import React, { ButtonHTMLAttributes, useCallback, useState } from 'react';
import { OptionComponentProps } from './SelectComponent';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface FilterButtonComponentProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  options: OptionComponentProps[];
}

function FilterButtonComponent({
  text,
  options,
  ...props
}: FilterButtonComponentProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const deleteQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleClick = (value: string) => {
    if (searchParams.get(text.toLowerCase()) === value)
      router.push(
        `${pathName}?${deleteQueryString(text.toLowerCase(), value)}`,
      );
    else
      router.push(
        `${pathName}?${createQueryString(text.toLowerCase(), value)}`,
      );
  };

  return (
    <div className="relative">
      <button
        {...props}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-[10px] rounded-[8px] border-[1px] border-[#9198AA] px-[12px] py-[8px] text-[#9198AA]"
      >
        {text}
        <ChevronsUpDownIcon className="size-[18px] text-[#9198AA]" />
      </button>
      {open && (
        <div className="absolute top-[45px] flex max-h-[300px] flex-col items-start gap-[30px] overflow-y-scroll rounded-[8px] bg-foreground px-6 py-3">
          {options.map((optionItem) => (
            <button
              key={optionItem.label}
              className={twMerge(
                'text-black',
                searchParams.get(text.toLowerCase()) === optionItem.value
                  ? 'line-through'
                  : 'none',
              )}
              onClick={() => handleClick(optionItem.value.toString())}
            >
              {optionItem.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterButtonComponent;
