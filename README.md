# Tiga ORM
Tiga ORM is a TypeScript Query Builder that builds top of [Knex](https://knexjs.org/).

## Features

- Simple and intuitive query builder interface
- Built on top of Knex.js for reliable database operations
- Full TypeScript support
- Built-in logging with Pino
- PostgreSQL support

## Example

```typescript
import Database from 'tigaorm';

// Initialize the database connection
const db = new Database({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'tigaorm',
    password: 'tigaorm',
    database: 'tigaorm',
  },
});

// Build and execute queries
const query = db
  .select('id', 'name')
  .from('users')
  .where('name', '=', 'John')
  .andWhere('age', '>', 25)
  .orWhere('city', '=', 'New York');

// Get the raw SQL
console.log(query.toSQL().sql);
// Output: select "id", "name" from "users" where "name" = ? and "age" > ? or "city" = ?

// Execute the query
const results = await query.firstOrFail();

// Don't forget to disconnect when done
await db.disconnect();
```

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tigaorm.git
cd tigaorm
```

2. Install dependencies:
```bash
yarn install
```

3. Start development mode:
```bash
yarn dev
```

This will start the TypeScript compiler in watch mode, automatically recompiling files as you make changes.

## Testing

The project uses [Japa](https://japa.dev/) for testing. You can run tests using:

```bash
# Run tests once
docker-compose up -d
yarn test

# Run tests in watch mode
docker-compose up -d
yarn run test:watch
```

## Available Scripts

- `yarn dev` - Starts TypeScript compiler in watch mode
- `yarn build` - Builds the project
- `yarn lint` - Runs ESLint
- `yarn format` - Formats code with Prettier
- `yarn test` - Runs tests
- `yarn test:watch` - Runs tests in watch mode
- `yarn clean` - Cleans the build directory

## Current Query Builder Features

- [x] select - Select specific columns from a table
- [x] from - Specify the table to query from
- [x] where - Add a where clause to the query
- [x] andWhere - Add an and where clause to the query
- [x] orWhere - Add an or where clause to the query
- [x] whereNot - Add a where not clause to the query
- [x] orWhereNot - Add an or where not clause to the query
- [x] andWhereNot - Add an and where not clause to the query
- [x] offset - Add an offset to the query
- [x] limit - Add a limit to the query
- [x] toSQL - Get the SQL representation of the query
- [x] toNative - Get the native SQL representation with bindings
- [x] toQuery - Get the formatted SQL query string
- [x] exec - Execute the query and get results

---
# Roadmap
## v0.1
- [x] Setup a NodeJS library infra
- [x] Connect to PostgreSQL DB
- [ ] Basic Query Builder
  - [ ] raw
  - [x] select
  - [x] from
  - [x] where
    - [x] andWhere
    - [x] orWhere
    - [x] whereNot
    - [x] orWhereNot
    - [x] andWhereNot
  - [ ] orderBy
  - [x] offset
  - [x] limit
  - [ ] forPage
  - [ ] count
    - [ ] min
    - [ ] max
    - [ ] sum
    - [ ] avg
  - [ ] insert
  - [ ] bulkInsert
  - [ ] returning
  - [ ] update
  - [ ] delete
  - [ ] debug
  - [x] toSQL
  - [x] toNative
  - [x] toQuery
  - [ ] first
  - [ ] firstOrFail
- [x] Add tests using Japa

## v0.2
- [ ] Improve Query Builder
  - [ ] whereLike
  - [ ] whereILike
  - [ ] whereIn
    - [ ] andWhereIn
    - [ ] orWhereIn
    - [ ] whereNotIn
    - [ ] orWhereNotIn
    - [ ] andWhereNotIn
  - [ ] whereNull
    - [ ] andWhereNull
    - [ ] orWhereNull
    - [ ] whereNotNull
    - [ ] orWhereNotNull
    - [ ] andWhereNotNull
  - [ ] whereExists
    - [ ] andWhereExists
    - [ ] orWhereExists
    - [ ] whereNotExists
    - [ ] orWhereNotExists
    - [ ] andWhereNotExists
  - [ ] whereBetween
    - [ ] andWhereBetween
    - [ ] orWhereBetween
    - [ ] whereNotBetween
    - [ ] orWhereNotBetween
    - [ ] andWhereNotBetween
  - [ ] orderByRaw
  - [ ] distinct
  - [ ] distinctOn
  - [ ] groupBy
  - [ ] groupByRaw
  - [ ] count
    - [ ] countDistinct
    - [ ] sumDistinct
    - [ ] avgDistinct
  - [ ] increment
  - [ ] decrement

## v0.3
- [ ] Improve Query Builder
  - [ ] join
  - [ ] joinRaw
  - [ ] onIn
  - [ ] onNotIn
  - [ ] onNull
  - [ ] onNotNull
  - [ ] onExists
  - [ ] onNotExists
  - [ ] onBetween
  - [ ] onNotBetween
  - [ ] having
    - [ ] havingIn
    - [ ] havingNotIn
    - [ ] havingNull
    - [ ] havingNotNull
    - [ ] havingExists
    - [ ] havingNotExists
    - [ ] havingBetween
    - [ ] havingNotBetween
  - [ ] havingRaw
  - [ ] whereRaw
    - [ ] andWhereRaw
    - [ ] orWhereRaw
    - [ ] whereNotRaw
    - [ ] orWhereNotRaw
    - [ ] andWhereNotRaw

## v0.4
- [ ] Improve Query Builder
  - [ ] whereJson
    - [ ] andWhereJson
    - [ ] orWhereJson
    - [ ] whereNotJson
    - [ ] orWhereNotJson
    - [ ] andWhereNotJson
  - [ ] whereJsonSuperset
    - [ ] andWhereJsonSuperset
    - [ ] orWhereJsonSuperset
    - [ ] whereNotJsonSuperset
    - [ ] orWhereNotJsonSuperset
    - [ ] andWhereNotJsonSuperset
  - [ ] whereJsonSubset
    - [ ] andWhereJsonSubset
    - [ ] orWhereJsonSubset
    - [ ] whereNotJsonSubset
    - [ ] orWhereNotJsonSubset
    - [ ] andWhereNotJsonSubset  
  - [ ] union
  - [ ] with
  - [ ] withMaterialized
  - [ ] withNotMaterialized
  - [ ] withRecursive
  - [ ] pagination
  - [ ] clone
  - [ ] timeout
