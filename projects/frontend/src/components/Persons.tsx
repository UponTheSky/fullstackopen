import React from 'react';

import { PersonType } from '../types';

interface PersonsProps {
  persons: Partial<PersonType>[];
}

export function Persons({ persons }: PersonsProps) {
  return (
    <ul>
      {persons.map(({ name, number }) => <li key={name}>{name} {number}</li>)}
    </ul>
  );
}
