import React from 'react';

import { StatisticsLineType } from '../types';

export function StatisticsLine({ text, value }: StatisticsLineType) {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  );
}
