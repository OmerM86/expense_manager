import React from 'react';
import { OptionComponentProps } from './ui/SelectComponent';
import GroupFilterButtonComponent from './ui/GroupFilterButtonComponent';
import FilterButtonComponent from './ui/FilterButtonComponent';

function FilterGroup() {
  const categoryOptions: OptionComponentProps[] = [
    { label: 'Food', value: 'food' },
    { label: 'Transport', value: 'transport' },
    { label: 'Entertainment', value: 'entertainment' },
  ];

  const monthOptions: OptionComponentProps[] = [
    { label: 'January', value: 'january' },
    { label: 'February', value: 'february' },
    { label: 'March', value: 'march' },
    { label: 'April', value: 'april' },
    { label: 'May', value: 'may' },
    { label: 'June', value: 'june' },
    { label: 'July', value: 'july' },
    { label: 'August', value: 'august' },
    { label: 'September', value: 'september' },
    { label: 'October', value: 'october' },
    { label: 'November', value: 'november' },
    { label: 'December', value: 'december' },
  ];

  return (
    <div className="mr-[155px] flex items-center justify-end gap-[20px]">
      <GroupFilterButtonComponent text="Categories" options={categoryOptions} />
      <FilterButtonComponent text="Month" options={monthOptions} />
    </div>
  );
}

export default FilterGroup;
