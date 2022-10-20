import React from 'react';

import { StatType } from '../types';

export function Stat({ text, stat }: StatType) {
  return <div>{text} {stat}</div>;
}
