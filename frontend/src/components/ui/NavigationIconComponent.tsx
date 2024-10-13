import { hexToRgba } from '@/lib/utils';
import React, { AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface NavigationIconComponentProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  Icon: JSX.Element;
  color: string;
}

function NavigationIconComponent({
  Icon,
  color,
  className,
  ...props
}: NavigationIconComponentProps) {
  return (
    <a {...props}>
      <div
        className={twMerge('rounded-[8px] p-[15px]', className)}
        style={{
          backgroundColor: color,
          boxShadow: `0px 4px 4px ${hexToRgba(color, '0.25')}`,
        }}
      >
        {Icon}
      </div>
    </a>
  );
}

export default NavigationIconComponent;
