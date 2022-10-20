import React from 'react';

interface PropsType {
  part: string;
  exercise: number;
}

export function Part({ part, exercise }: PropsType) {
  return <p>{part} {exercise}</p>
}
