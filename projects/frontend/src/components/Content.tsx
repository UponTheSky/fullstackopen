import React from 'react';

import { PartType } from '../types';

import { Part } from './Part';

interface ContentProps {
  parts: PartType[];
}

export function Content({ parts }: ContentProps) {
  return (
    <div>
      {
        parts.map(({ name, exercises, id }) => 
          <Part key={id} name={name} exercises={exercises} />
        )
      }
    </div>
  )  
}
