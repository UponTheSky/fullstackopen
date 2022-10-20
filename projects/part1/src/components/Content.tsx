import React from 'react';

import { Part } from './Part'; 

interface PropsType {
  contents: {
    part: string;
    exercises: number;
  }[];
}

export function Content({ contents }: PropsType) {
  return (
    <>
      {contents.map(({ part, exercises }) => <Part part={part} exercise={exercises} />)}
    </>
  );
}
