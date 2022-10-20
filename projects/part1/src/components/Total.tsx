import React from 'react';

interface PropsType {
  totalNumber: number;
}

export function Total({ totalNumber }: PropsType) {
  return <p>Number of exercises {totalNumber}</p>
}
