import React, { useState, ChangeEventHandler, FormEventHandler } from 'react';

import { PersonType } from './types';

const App = () => {
  const [persons, setPersons] = useState<Partial<PersonType>[]>([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState<PersonType['name']>('');
  const [newNumber, setNewNumber] = useState<PersonType['number']>(0);

  const handleNameInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewNumber(Number(event.target.value));
  };
  const handleSubmitForm: FormEventHandler = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(prev => [...prev, { name: newName, number: newNumber }]);

    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(({ name, number }) => <li key={name}>{name} {number}</li>)}
      </ul>
    </div>
  );
}

export default App