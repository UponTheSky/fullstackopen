# Using relational databases with Sequelize

## Advantages and disadvantages of document databases
- document db
  - *schemaless*: the db has only very limited awareness of what kind of data is stored in its collections
    - knows the type of each of the fields, but don't care about those fields
    - don't know which entity of another collection an id refers to 
  - the schema of the db exists only in the program code

  - pros: flexible, faster dev in some cases
  - cons: error-prone(everything is upto a programmer)

- rdb leans heavily on a schema

## Application database
- accessing DB directly with a command lines
  - `mysql.server start` => `mysql -u root -p`
  - create db: `CREATE DATABASE rdb` => `use rdb`
  - create table: `CREATE TABLE notes (...)`
  - browse tables: `SHOW TABLES` => `DESCRIBE notes`
  - add data: `insert into notes (...) values (...)`

## Node application using a relational database
- ORM library: typeORM, sequalize, prisma => here we follow sequelize
- here we use mysql: mysql drive required(`yarn add mysql2`)

## Model
- utilizing ORM's power

## Creating database tables automatically
- using ORM to generate database in sync with the application's code

## Other operations

## Printing the objects returned by Sequelize to the console
- for neat view, easy debugging
