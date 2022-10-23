import React from 'react';

import { PersonType } from '../types';

interface PersonsProps {
  persons: PersonType[];
  deletePersonHandler: (id: number) => void;
}

export function Persons({ persons, deletePersonHandler }: PersonsProps) {
  return (
    <ul>
      {persons.map(({ name, number, id }) => (
        <li key={id}>
         {name} {number} 
          <button onClick={() => { deletePersonHandler(id) }}>delete</button>
        </li>
      ))}
    </ul>
  );
}
