import React from 'react';

import { PartType } from '../types';

interface PartProps extends Omit<PartType, 'id'>{}

export function Part({ name, exercises }: PartProps) {
  return (
    <div>
      {name} {exercises}
    </div>
  )  
}
