import React from 'react';

import { ButtonType } from '../types';

export function Button<T>({ text, onClickHandler }: ButtonType<T>) {
  return <button onClick={onClickHandler}>{text}</button> ;
}
