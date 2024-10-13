import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeIconComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon: JSX.Element;
  color: string;
}

function BadgeIconComponent({
  Icon,
  className,
  color,
  ...props
}: BadgeIconComponentProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'flex size-[44px] items-center justify-center rounded-[12px] p-[12px]',
        className,
      )}
      style={{
        backgroundColor: color,
      }}
    >
      {Icon}
    </div>
  );
}

export default BadgeIconComponent;
