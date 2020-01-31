import React from 'react';

type TodoListCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const TodoListCheckbox = ({
  checked,
  onChange,
}: TodoListCheckboxProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.checked);
  };

  return <input type='checkbox' checked={checked} onChange={onChangeHandler} />;
};
