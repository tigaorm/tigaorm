import knex, { type Knex } from 'knex';
import pino, { Logger } from 'pino';

export default class Database {
  private knexQuery: Knex.QueryBuilder | null = null;
  private client: Knex | null;
  private logger: Logger;

  constructor(config: Knex.Config) {
    this.client = knex(config);
    this.logger = pino.default({
      transport: {
        target: 'pino-pretty', // TODO: Remove this in production
      },
    });
  }

  // Getters
  getClient() {
    return this.client;
  }

  getLogger() {
    return this.logger;
  }

  getKnexQuery() {
    return this.knexQuery;
  }

  // Setters
  setKnexQuery(knexQuery: Knex.QueryBuilder | null) {
    this.knexQuery = knexQuery;
  }

  setClient(client: Knex | null) {
    this.client = client;
  }

  setLogger(logger: Logger) {
    this.logger = logger;
  }

  // Query Builder
  select(...args: string[]) {
    this.knexQuery = this.getClient()!
      .queryBuilder()
      .select(...args);
    return this;
  }

  from(table: string) {
    if (!this.knexQuery) {
      this.knexQuery = this.getClient()!.queryBuilder().select('*');
    }
    this.knexQuery = this.knexQuery.from(table);
    return this;
  }

  toSQL(): Knex.Sql {
    if (!this.knexQuery) {
      throw new Error('No query has been built yet. Call select() or from() first.');
    }
    return this.knexQuery.toSQL();
  }

  toNative(): Knex.SqlNative {
    if (!this.knexQuery) {
      throw new Error('No query has been built yet. Call select() or from() first.');
    }
    return this.knexQuery.toSQL().toNative();
  }

  toQuery(): string {
    if (!this.knexQuery) {
      throw new Error('No query has been built yet. Call select() or from() first.');
    }
    return this.knexQuery.toQuery();
  }

  // Query Execution
  async exec() {
    if (!this.knexQuery) {
      throw new Error('No query has been built yet. Call select() or from() first.');
    }
    return this.knexQuery;
  }

  // Disconnect
  async disconnect() {
    await this.getClient()?.destroy();
    this.setClient(null);
    this.setKnexQuery(null);
    this.getLogger().info('Database disconnected');
  }
}
