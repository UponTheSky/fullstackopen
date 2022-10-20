import React from 'react';

import { StatType } from '../types';

import { Stat } from './Stat';

interface StatsProps {
  stats: StatType[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <>
      {stats.map(({ text, stat }) => <Stat text={text} stat={stat} />)}
    </>
  );
}
