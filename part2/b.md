# Forms
- `form`: default event is to submit data to the server, which may cause the page to reload
- how can access the data contained in the form's input element?

## Controlled component
- example: `<input>`

```tsx
const addNote = (event) => {
  event.preventDefault();

  const newNote = {

  };

  setNote([...note, newNote]);
  setNewNote('');
}

const handleNoteChange = (event) => {
  setNewNote(event.target.value); // "target" means the controlled input element
}

<form onSubmit={addNote}> {/* addNote should call event.preventDefault() first */}
  <input
    value={newNote}
    onChange={handleNoteChange}
  />
  <button type="submit">save</button>
```

## Filtering Displayed Elements
- using `filter` method
