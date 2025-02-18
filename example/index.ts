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

const query = await client
  .select('id', 'name')
  .from('users')
  .where('name', '=', 'John')
  .andWhere('age', '>', 25)
  .orWhere('city', '=', 'New York');

console.log(query.toSQL().sql);
