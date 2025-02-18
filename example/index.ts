import Database from '../src/database';

const client = new Database({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'tigaorm',
    password: 'tigaorm',
    database: 'tigaorm',
  },
});

const result = await client
  .select('id', 'name')
  .from('users')
  .where('name', '=', 'John')
  .orWhereNot('id', '=', 2)
  .toQuery();

console.log(result);
