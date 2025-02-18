# Tiga ORM
Tiga ORM is a TypeScript Active Record ORM that builds top of [Knex](https://knexjs.org/).

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

## Example

```bash
docker-compose up -d
npx tsx example/index.ts
```

## Available Scripts

- `yarn dev` - Starts TypeScript compiler in watch mode
- `yarn build` - Builds the project
- `yarn lint` - Runs ESLint
- `yarn format` - Formats code with Prettier
- `yarn test` - Runs tests
- `yarn test:watch` - Runs tests in watch mode
- `yarn clean` - Cleans the build directory

## Usage
WIP

---
# Roadmap
## v0.1
- [x] Setup a NodeJS library infra
- [x] Connect to PostgreSQL DB
- [ ] Basic Query Builder
	- [ ] raw
	- [ ] select
	- [ ] from
	- [ ] where
		- [ ] andWhere
		- [ ] orWhere
		- [ ] whereNot
		- [ ] orWhereNot
		- [ ] andWhereNot
	- [ ] orderBy
	- [ ] offset
	- [ ] limit
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
	- [ ] toSQL
	- [ ] toNative
	- [ ] toQuery
	- [ ] exec
	- [ ] first
	- [ ] firstOrFail
- [ ] Add tests using Japa

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
