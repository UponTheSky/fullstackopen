import React, { useState, ChangeEventHandler, FormEventHandler } from 'react';

import { PersonType } from './types';

const App = () => {
  const [persons, setPersons] = useState<Partial<PersonType>[]>([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState<PersonType['name']>('');

  const handleNameInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewName(event.target.value);
  }
  const handleSubmitName: FormEventHandler = (event) => {
    event.preventDefault();
    setPersons(prev => [...persons, { name: newName }]);
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitName}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(({ name }) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}

export default App