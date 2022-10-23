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
    const newPerson = { name: newName, number: newNumber };
    let personResponse: PersonType;

    const personAlready = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    if (personAlready) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personResponse = await personAPI.update(personAlready.id, newPerson);
        personResponse && setPersons(persons.map(person => person.id !== personAlready.id ? person : personResponse));
      }
      setNewName('');
      return;
    } 
    
    personResponse = await personAPI.create(newPerson);
    if (personResponse) {
      setPersons(prev => [...prev, personResponse]);
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

export default App;