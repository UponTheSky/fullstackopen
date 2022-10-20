import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Header } from './components/Header';
import { Content } from './components/Content';
import { Total } from './components/Total';

function App() {
  const course = 'Half Stack application development';
  const contents = [
    {part: 'Fundamentals of React', exercises: 10},
    {part: 'Using props to pass data', exercises: 7},
    {part: 'State of a component', exercises: 14},
  ];

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total totalNumber={contents.reduce((prev, curr) => prev + curr.exercises, 0)} />
    </div>
  );
}

export default App;
