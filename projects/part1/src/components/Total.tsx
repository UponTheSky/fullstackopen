import React from 'react';

interface PropsType {
  parts: {
    part: string;
    exercises: number;
  }[];
}

export function Total({ parts }: PropsType) {
  return <p>Number of exercises {parts.reduce((prev, { part, exercises }) => prev + exercises, 0)}</p>
}
