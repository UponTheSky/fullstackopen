import React from 'react';

interface PropsType {
  contents: {
    part: string;
    exercises: number;
  }[];
}

export function Content({ contents }: PropsType) {
  return (
    <>
      {contents.map(({ part, exercises }) => <p>{part} {exercises}</p>)}
    </>
  );
}
