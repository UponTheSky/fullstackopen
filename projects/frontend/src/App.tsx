import React, { useState, ChangeEventHandler, FormEventHandler, useEffect } from 'react';

import axios from 'axios';

import { PersonType } from './types';

import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonFrom';
import { Persons } from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState<Partial<PersonType>[]>([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState<PersonType['name']>('');
  const [newNumber, setNewNumber] = useState<PersonType['number']>(0);
  const [searchedName, setSearchedName] = useState('');

  useEffect(() => {
    const fetchPersons = async () => {
      const fetchedData = await axios.get<Partial<PersonType>[]>('http://localhost:3001/persons');
      const fetchedPersons = fetchedData.data;
      setPersons(fetchedPersons);
    };  

    fetchPersons();
  }, []);

  const handleNameInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewNumber(Number(event.target.value));
  };
  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchedName(event.target.value);
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

  const personsShown = searchedName === '' 
    ? persons
    : persons.filter(person => person.name?.toLowerCase() === searchedName.toLowerCase());

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={searchedName} onChangeHandler={handleSearchInput} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        handleSubmitForm={handleSubmitForm}
      />
      <h2>Numbers</h2>
      <Persons persons={personsShown} />
    </div>
  );
}

export default App