import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Header } from './components/Header';
import { Content } from './components/Content';
import { Total } from './components/Total';

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {part: 'Fundamentals of React', exercises: 10},
    {part: 'Using props to pass data', exercises: 7},
    {part: 'State of a component', exercises: 14},
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App;
