import React, { ChangeEventHandler } from 'react';

interface FilterProps {
  text: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

export function Filter({ text, onChangeHandler }: FilterProps) {
  return (
    <div>
      filter shown with: <input value={text} onChange={onChangeHandler} />
    </div>
  ); 
}
