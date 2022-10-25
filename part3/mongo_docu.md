- https://www.mongodb.com/docs/manual/core/document/

# Documents
- **BSON**: a binary representation of JSON documents(usually containing more data than JSON)
- mongoDB stores data records as BSON documents

## Document Structure
- mongoDB documents are composed of (field, value) pairs
- the value can be any of the BSON data types: ObjectId / document / Date / array / String / NumberLong

### Field Names
- field names are strings

- restrictions 
  - `_id`: preserved for use as a primary key - must be unique in the collection, immutable, may be of any type other than an array
  - cannot contain the `null` character
  - `.`, `$` are permitted(with some restrictions)

- whereas a BSON document allows duplicated field names, a mongoDB document doesn't(but internally, there could be some such documents) 

### Field Value Limit
- maximum index key length

## Dot Notation
- mongoDB uses the dot notation to access the elements of an array and to access the fields of an embedded document

### Arrays
- access: `<array>.<index>`

### Embedded Documents
- access: `<document>.<field>`

## Document Limitations

### Document Size Limit
- the maximum BSON document size is 16MB
- to prevent a single document dominating RAM or bandwidth use 

### Document Field Order
- the fields are ordered

#### Field Order in Queries
- some operations may reorder fields: don't rely on a specific order

#### Field Order in Write Operations
- for write operations, mongoDB preverves fields order except:
  - `_id`: must be the first field
  - updates that include `renaming` of field names may reorder the fields

### The _id Field
- in mongoDB, each document stored in a collection requires a unique `_id` field that acts as a primary key
- if omitted, the mongoDB driver automatically generates an `ObjectId` for the field

- constraints: 
  - by default: mongoDB creates a unique index on the `_id` field during the creation of a collection
  - always the first field in the documents

#### _ If the _id contains subfields, the subfield names cannot begin with a $ symbol
- `_id` field may contain values of any BSON data type, other than an array, regex, or undefined

## Other Uses of the Document Structure
- skim through this part
