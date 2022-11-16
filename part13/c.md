# Migrations, many-to-many relationships

## Migrations
- migration?  
  - a single js file that describes some modification to a DB
  - a separate migration file is created for each single or multiple changes at once

- why migration?  
  - keep track the changes in the DB => version control

## Admin user and user disabling

## Many-to-many relationships
- many-to-many: connection table

## Note on the properties of Sequelize model objects
- the objects returned by Sequelize are not normal object that we can freely add or delete properties
- instead, create a new object

## Revisiting many-to-many relationships
- adding more many-to-many relationships

## Concluding remarks

### Eager vs lazy fetch
- lazy fetch: fetching entities only when required

### Features of models
- (default)scopes
- methods on models: instance / static methods

## Repeatability of models and migrations
- we need to separately manage models and migrations
