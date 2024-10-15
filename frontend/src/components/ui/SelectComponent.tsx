import React, { SelectHTMLAttributes } from 'react';

export interface OptionComponentProps {
  label: string;
  value: string | number;
}

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: OptionComponentProps[];
}

function SelectComponent({
  label,
  name,
  options,
  ...props
}: SelectComponentProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="mb-2 block text-sm">
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        {...props}
        className="form-select relative w-full appearance-none rounded-lg border-[1px] border-gray-300 px-[12px] py-[10px] text-sm placeholder:text-gray-400 focus:outline-none"
      >
        {options.map((optionItem) => (
          <option key={optionItem.value} value={optionItem.value}>
            {optionItem.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectComponent;
