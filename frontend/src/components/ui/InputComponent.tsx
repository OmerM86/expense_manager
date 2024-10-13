'use client';

import React from 'react';

interface InputComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function InputComponent({
  label,
  name,
  type = 'text',
  value = '',
  ...props
}: InputComponentProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="mb-2 block text-sm">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        {...props}
        className="w-full rounded-lg border-[1px] border-gray-300 px-[12px] py-[10px] text-sm placeholder:text-gray-400 focus:outline-none"
      />
    </div>
  );
}

export default InputComponent;
