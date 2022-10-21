import React from 'react';

import { StatisticsLine } from './StatisticsLine';

interface StatisticsProps {
  good: number;
  neutral: number;
  bad: number;
}

export function Statistics({ good, neutral, bad }: StatisticsProps) {
  const getTotal = () => good + neutral + bad;
  const getAverage = () => getTotal() / 3;
  const getPositive = () => good / getTotal();
  
  return (
    <div>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={getTotal()} />
      <StatisticsLine text="average" value={getAverage()} />
      <StatisticsLine text="positive" value={getPositive()} />
    </div>
  );
}
