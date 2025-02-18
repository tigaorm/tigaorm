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

const query = client.select('id', 'name').from('users').where('id', '=', 1);

// Get the raw SQL
console.log(query.toSQL().sql);
// Output: select "id", "name" from "users" where "name" = ? and "age" > ? or "city" = ?

// Execute the query
const results = await query.firstOrFail();

console.log(results);

// Don't forget to disconnect when done
await client.disconnect();
