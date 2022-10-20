import React from 'react';

import { Part } from './Part'; 

interface PropsType {
  parts: {
    part: string;
    exercises: number;
  }[];
}

export function Content({ parts }: PropsType) {
  return (
    <>
      {parts.map(({ part, exercises }) => <Part part={part} exercise={exercises} />)}
    </>
  );
}
