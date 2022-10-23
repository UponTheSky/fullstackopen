import React, { ChangeEventHandler, FormEventHandler } from 'react';

interface PersonFormProps {
  newName: string;
  newNumber: string;
  handleNameInput: ChangeEventHandler<HTMLInputElement>;
  handleNumberInput: ChangeEventHandler<HTMLInputElement>;
  handleSubmitForm: FormEventHandler;
}

export function PersonForm({ 
  newName, 
  newNumber, 
  handleNameInput, 
  handleNumberInput, 
  handleSubmitForm
}: PersonFormProps) {
  return (
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
  );
}
