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

const query = client.select('id', 'name').from('users');
const sql = query.toQuery();

console.log(sql);

// const result = await client.select('*').from('users').exec();

// console.log(result);
