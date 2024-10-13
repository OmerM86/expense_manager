'use client';

import React, { AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface LinkComponentProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
}

function LinkComponent({ title, className, ...props }: LinkComponentProps) {
  return (
    <a
      {...props}
      className={twMerge('text-sm text-gray-400 underline', className)}
    >
      {title}
    </a>
  );
}

export default LinkComponent;
