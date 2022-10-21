import React from 'react';

import { PartType } from '../types';

import { Header } from './Header';
import { Content } from './Content'

interface CourseProps {
  course: {
    name: string;
    parts: PartType[];
  }
}

export function Course({ course: { name, parts } }: CourseProps) {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0);

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <b>total of {total} exercises</b>
    </div>
  )  
}
