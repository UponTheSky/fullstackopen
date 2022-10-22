import React, { ChangeEventHandler } from 'react';

interface SearchProps {
  text: string;
  searchKeyword: string;
  onChangeHandler: ChangeEventHandler;
}

export function Search({ text, searchKeyword, onChangeHandler }: SearchProps) {
  return <div>{text} <input value={searchKeyword} onChange={onChangeHandler} /></div>
};
