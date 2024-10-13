import React, { useEffect, useMemo, useState } from 'react';
import InputComponent from './ui/InputComponent';
import SelectComponent from './ui/SelectComponent';
import ButtonComponent from './ui/ButtonComponent';

export enum Action {
  none = 0,
  view = 1,
  edit = 2,
  delete = 3,
  create = 4,
}

export interface ActionProps {
  action: Action;
  open: boolean;
  eid?: number;
}

interface ExpenseFormProps {
  action?: ActionProps;
  setAction: React.Dispatch<React.SetStateAction<ActionProps>>;
  fetchExpenses: () => Promise<void>;
}

interface Expense {
  title: string;
  amount: number;
  category: string;
}

interface Category {
  cid: number;
  name: string;
  color: string;
}

function ExpenseActionForm({
  action,
  setAction,
  fetchExpenses,
}: ExpenseFormProps) {
  switch (action?.action) {
    case Action.view:
      return (
        <ExpenseViewForm
          action={action}
          setAction={setAction}
          fetchExpenses={fetchExpenses}
        />
      );
    case Action.edit:
      return (
        <ExpenseEditForm
          action={action}
          setAction={setAction}
          fetchExpenses={fetchExpenses}
        />
      );
    case Action.delete:
      return (
        <ExpenseDeleteForm
          action={action}
          setAction={setAction}
          fetchExpenses={fetchExpenses}
        />
      );
    case Action.create:
      return (
        <ExpenseCreateForm
          setAction={setAction}
          fetchExpenses={fetchExpenses}
        />
      );
  }
}

async function getExpense(
  eid: number | undefined,
): Promise<Expense | string[]> {
  try {
    const response = await fetch(`api/expense/findOne/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: eid }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        title: data.title,
        amount: data.amount,
        category: data.category.name,
      };
    } else {
      return [data.message || 'Failed to get expense data'];
    }
  } catch (error) {
    return ['An unexpected error occurred'];
  }
}

function isExpense(expense: any): expense is Expense {
  return expense.title !== undefined;
}

function isCategory(category: any): category is Category[] {
  return category[0].cid !== undefined;
}

async function fetchCategories(): Promise<Category[] | string[]> {
  try {
    const response = await fetch('api/category/findAll', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return [data.message || 'Failed to get catogories list'];
    }
  } catch (error) {
    return ['An unexpected error occurred'];
  }
}

function ExpenseViewForm({ action, setAction }: ExpenseFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [data, setData] = useState<Expense>({
    title: '',
    amount: 0,
    category: '',
  });

  const handleData = async () => {
    const expense = await getExpense(action?.eid);
    if (isExpense(expense)) setData(expense);
    else setErrors(expense);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <form
      className="flex w-[320px] flex-col gap-[8px] rounded-[8px] bg-foreground px-[24px] py-[24px] text-black shadow-[0px_2px_2px_rgba(0,0,0,0.15)]"
      onSubmit={() => setAction({ action: Action.none, open: false })}
    >
      <InputComponent
        name={'title'}
        label="Title"
        placeholder="Restaurents & Cafe"
        value={data.title}
        disabled
      />
      <InputComponent
        name={'amount'}
        label="Amount"
        placeholder="100"
        type="number"
        value={data.amount}
        disabled
      />
      <SelectComponent
        name="category"
        label="Category"
        options={[{ label: data.category, value: data.category }]}
        value={data.category}
        disabled
      />
      <ButtonComponent
        title="Close"
        className="border-[1px] border-primary-subtle bg-primary"
        type="submit"
      />
      {errors.length > 0 && (
        <ul className="w-full list-disc space-y-2 rounded-lg bg-[#fed7d7] px-[28px] py-[12px] text-xs text-red-500">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

function ExpenseEditForm({
  action,
  setAction,
  fetchExpenses,
}: ExpenseFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number>();
  const [optionsData, setOptionsData] = useState<Category[]>([]);
  const [category, setCategory] = useState<string | number>();

  const handleData = async () => {
    const expense = await getExpense(action?.eid);
    if (isExpense(expense)) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(expense.category);
    } else setErrors(expense);
  };

  const handleFetch = async () => {
    const fetchedData = await fetchCategories();
    if (isCategory(fetchedData)) setOptionsData(fetchedData);
    else setErrors(fetchedData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: string[] = [];

    // validation errors
    if (!title) {
      newErrors.push('Title is required');
    }

    if (!amount) {
      newErrors.push('Amount is required');
    }

    if (!category) {
      newErrors.push('Category is required');
    }

    if (newErrors.length > 0) {
      // do not proceed further since validation errors exist
      setErrors(newErrors);
      return;
    }

    try {
      let cid: number = -1;

      optionsData.forEach((option) => {
        if (option.name === category) {
          cid = option.cid;
        }
      });

      if (cid === -1) setErrors(['Unable to find the selected category']);

      const response = await fetch('api/expense/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: action?.eid,
          title: title,
          amount: amount,
          category: cid,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchExpenses();
        setAction({ action: Action.none, open: false });
      } else {
        setErrors([data.message || 'Failed to update expense']);
      }
    } catch (error) {
      setErrors(['An unexpected error occurred']);
    }
  };

  useEffect(() => {
    handleData();
    handleFetch();
  }, []);

  const options = useMemo(() => {
    const optionList = optionsData.map(
      (option: { name: string; cid: number }) => {
        return {
          label: option.name,
          value: option.cid,
        };
      },
    );
    return optionList;
  }, [optionsData]);

  return (
    <form
      className="flex w-[320px] flex-col gap-[8px] rounded-[8px] bg-foreground px-[24px] py-[24px] text-black shadow-[0px_2px_2px_rgba(0,0,0,0.15)]"
      onSubmit={handleSubmit}
    >
      <InputComponent
        name={'title'}
        label="Title"
        placeholder="Restaurents & Cafe"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputComponent
        name={'amount'}
        label="Amount"
        placeholder="100"
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <SelectComponent
        name="category"
        label="Category"
        options={options}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <ButtonComponent
        title="Update"
        className="border-[1px] border-primary-subtle bg-primary"
        type="submit"
      />
      {errors.length > 0 && (
        <ul className="w-full list-disc space-y-2 rounded-lg bg-[#fed7d7] px-[28px] py-[12px] text-xs text-red-500">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

function ExpenseDeleteForm({
  action,
  setAction,
  fetchExpenses,
}: ExpenseFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [data, setData] = useState<Expense>({
    title: '',
    amount: 0,
    category: '',
  });

  const handleData = async () => {
    const expense = await getExpense(action?.eid);
    if (isExpense(expense)) setData(expense);
    else setErrors(expense);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('api/expense/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: action?.eid }),
      });
      const data = await response.json();

      if (response.ok) {
        fetchExpenses();
        setAction({ action: Action.none, open: false });
      } else {
        setErrors([data.message || 'Failed to delete expense']);
      }
    } catch (error) {
      setErrors(['An unexpected error occurred']);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <form
      className="flex w-[320px] flex-col gap-[8px] rounded-[8px] bg-foreground px-[24px] py-[24px] text-black shadow-[0px_2px_2px_rgba(0,0,0,0.15)]"
      onSubmit={handleSubmit}
    >
      <InputComponent
        name={'title'}
        label="Title"
        placeholder="Restaurents & Cafe"
        value={data.title}
        disabled
      />
      <InputComponent
        name={'amount'}
        label="Amount"
        placeholder="100"
        type="number"
        value={data.amount}
        disabled
      />
      <SelectComponent
        name="category"
        label="Category"
        options={[{ label: data.category, value: data.category }]}
        value={data.category}
        disabled
      />
      <ButtonComponent
        title="Delete"
        className="border-[1px] border-primary-subtle bg-red-500"
        type="submit"
      />
      {errors.length > 0 && (
        <ul className="w-full list-disc space-y-2 rounded-lg bg-[#fed7d7] px-[28px] py-[12px] text-xs text-red-500">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

function ExpenseCreateForm({ setAction, fetchExpenses }: ExpenseFormProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number>();
  const [optionsData, setOptionsData] = useState<Category[]>([]);
  const [category, setCategory] = useState<string | number>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const handleFetch = async () => {
      const fetchedData = await fetchCategories();
      if (isCategory(fetchedData)) setOptionsData(fetchedData);
      else setErrors(fetchedData);
    };
    handleFetch();
  }, []);

  const options = useMemo(() => {
    const optionList = optionsData.map(
      (option: { name: string; cid: number }) => {
        return {
          label: option.name,
          value: option.cid,
        };
      },
    );
    setCategory(optionList[0]?.value);
    return optionList;
  }, [optionsData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: string[] = [];

    // validation errors
    if (!title) {
      newErrors.push('Title is required');
    }

    if (!amount) {
      newErrors.push('Amount is required');
    }

    if (!category) {
      newErrors.push('Category is required');
    }

    if (newErrors.length > 0) {
      // do not proceed further since validation errors exist
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('api/expense/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount, category }),
      });
      const data = await response.json();

      if (response.ok) {
        await fetchExpenses();
        setAction({ action: Action.none, open: false });
      } else {
        setErrors([data.message || 'Failed to save expense']);
      }
    } catch (error) {
      setErrors(['An unexpected error occurred']);
    }
  };

  return (
    <form
      className="flex w-[320px] flex-col gap-[8px] rounded-[8px] bg-foreground px-[24px] py-[24px] text-black shadow-[0px_2px_2px_rgba(0,0,0,0.15)]"
      onSubmit={handleSubmit}
    >
      <InputComponent
        name={'title'}
        label="Title"
        placeholder="Restaurents & Cafe"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputComponent
        name={'amount'}
        label="Amount"
        placeholder="100"
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <SelectComponent
        name="category"
        label="Category"
        options={options}
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      <ButtonComponent
        title="Submit"
        className="border-[1px] border-primary-subtle bg-primary"
        type="submit"
      />
      {errors.length > 0 && (
        <ul className="w-full list-disc space-y-2 rounded-lg bg-[#fed7d7] px-[28px] py-[12px] text-xs text-red-500">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default ExpenseActionForm;
