import React, { useState, ChangeEventHandler, FormEventHandler, useEffect } from 'react';

import personAPI from './api/persons';

import { PersonType } from './types';

import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonFrom';
import { Persons } from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState<PersonType[]>([]);
  const [newName, setNewName] = useState<PersonType['name']>('');
  const [newNumber, setNewNumber] = useState<PersonType['number']>('0');
  const [searchedName, setSearchedName] = useState('');

  useEffect(() => {
    const fetchPersons = async () => {
      const fetchedPersons = await personAPI.getAll();
      setPersons(fetchedPersons);
    };  

    fetchPersons();
  }, []);

  const handleNameInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchedName(event.target.value);
  };
  const deletePersonHandler = async (id: number) => {
    const deletedPerson = persons.find(person => person.id == id);

    if (deletedPerson && window.confirm(`Delete ${deletedPerson.name}?`)) {
      const deletedData = await personAPI.delete_(id);
      if (deletedData) {
        setPersons(prev => prev.filter(person => person.id && (person.id !== id)));
      }
    }
  }

  const handleSubmitForm: FormEventHandler = async (event) => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    const postPerson = await personAPI.create(newPerson);

    if (postPerson) {
      setPersons(prev => [...prev, postPerson]);
      setNewName('');
    }
  };

  const personsShown = searchedName === '' 
    ? persons
    : persons.filter(person => person.name?.toLowerCase().match( searchedName.toLowerCase()));

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
      <Persons persons={personsShown} deletePersonHandler={deletePersonHandler} />
    </div>
  );
}

export default App