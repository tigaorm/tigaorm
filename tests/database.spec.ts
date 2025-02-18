import { test } from '@japa/runner';
import Database from '../src/database/index.js';

const MOCK_CONFIG = {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'tigaorm',
    password: 'tigaorm',
    database: 'tigaorm',
  },
};

test.group('Database', () => {
  test('should build select query correctly', async ({ expect }) => {
    const db = new Database(MOCK_CONFIG);

    const tigaSql = db.select('id', 'name').from('users').toQuery();
    const knexSql = db.getClient()!.select('id', 'name').from('users').toQuery();

    expect(tigaSql).toBe(knexSql);

    await db.disconnect();
  });

  test('should build select * query correctly', async ({ expect }) => {
    const db = new Database(MOCK_CONFIG);

    const tigaSql = db.select('*').from('users').toQuery();
    const knexSql = db.getClient()!.select('*').from('users').toQuery();

    expect(tigaSql).toBe(knexSql);

    await db.disconnect();
  });

  test('should generate correct SQL object', async ({ expect }) => {
    const db = new Database(MOCK_CONFIG);

    const tigaSql = db.select().from('users').toSQL();
    const knexSql = db.getClient()!.select('*').from('users').toSQL();

    expect(tigaSql).toHaveProperty('method');
    expect(tigaSql).toHaveProperty('options');
    expect(tigaSql).toHaveProperty('sql');

    expect(tigaSql.method).toBe('select');
    expect(tigaSql.options).toBeInstanceOf(Object);
    expect(tigaSql.sql).toBe(knexSql.sql);

    await db.disconnect();
  });

  test('should disconnect from database', async ({ expect }) => {
    const db = new Database(MOCK_CONFIG);

    await db.disconnect();

    expect(db.getClient()).toBeNull();
    expect(db.getKnexQuery()).toBeNull();
  });
});
