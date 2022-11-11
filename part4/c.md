# User administration
- how to relate two different collections?
- unlike a relational database, document databases traditionally didn't support join queries

## References across collections
- *reference key*: the key values referring to another collection's elements
- but document dbs don't demand the foreign key to be stored in the resource collection itself
  - it could be stored in the user collection, or both
- document dbs go further: nested collections

- this seemingly freely behaved schema is rather harsh on developers
  - you need to design the best schema that suits the purpose of the application from the very beginning of development
  - on average, relational dbs offer a more or less suitable way of organizing data for many applications

## Mongoose schema for users

```js
{
  type: mongoose.Schema.Types.ObjectId, // => type is ObjectId
  ref: 'Note' // => references note-style documents
}
```

- in mongoDB, we store references in both documents related

## Creating users
- always store encrypted password of a user
- validation: whether given username is unique, follows certain rules, etc.

## Creating a new note
- updating user and note both at the same time

## Populate
- how to populate data with only ids?
- in relational db, we can use join
- mongoose helps doing some joins 
  - it does multiple joins
  - but this is not transactional, so we cannot guarantee that db changes while we run those queries
  - `populate` method
  - this functionality is based on how we defined the schemas(`ref` option)
