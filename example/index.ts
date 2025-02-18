import Database from '../src/database';

const client = Database.getInstance({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'tigaorm',
    password: 'tigaorm',
    database: 'tigaorm',
  },
});

const result = await client.select('*').from('users');

console.log(result);
