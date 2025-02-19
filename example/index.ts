import Database from '../src/database';

interface User {
  id: number;
  name: string;
  email: string;
}

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

const query = client.select('id', 'name').from('users').orderBy('id', 'asc').forPage(1, 10);

// Get the raw SQL
console.log(query.toSQL().sql);
// Output: select "id", "name" from "users" order by "id" asc offset 0 limit 10

// Execute the query
const results = await query.exec<Pick<User, 'id' | 'name'>>();

console.log(results);

// Don't forget to disconnect when done
await client.disconnect();
