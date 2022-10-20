import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Header } from './components/Header';
import { Content } from './components/Content';
import { Total } from './components/Total';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {part: 'Fundamentals of React', exercises: 10},
      {part: 'Using props to pass data', exercises: 7},
      {part: 'State of a component', exercises: 14},
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
