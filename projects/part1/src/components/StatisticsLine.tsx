import React from 'react';

import { StatisticsLineType } from '../types';

export function StatisticsLine({ text, value }: StatisticsLineType) {
  return <div>{text} {value}</div>;
}
