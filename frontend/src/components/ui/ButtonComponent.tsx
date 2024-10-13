'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

function ButtonComponent({ title, className, ...props }: ButtonComponentProps) {
  return (
    <button
      {...props}
      className={twMerge(
        'w-full rounded-lg px-[16px] py-[12px] text-sm text-white',
        className,
      )}
    >
      {title}
    </button>
  );
}

export default ButtonComponent;
