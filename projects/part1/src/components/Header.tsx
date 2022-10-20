import React from 'react';

interface PropsType {
  course: string;
}

export function Header({ course }: PropsType) {
  return <h1>{course}</h1>
} 
