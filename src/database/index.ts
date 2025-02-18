import knex, { type Knex } from 'knex';
import pino, { Logger } from 'pino';

export default class Database {
  private knexQuery: Knex.QueryBuilder;
  private client: Knex;
  private logger: Logger;

  private static instance: Database;

  constructor(config: Knex.Config) {
    this.client = knex(config);
    this.knexQuery = this.client.select();
    this.logger = pino.default({
      transport: {
        target: 'pino-pretty', // TODO: Remove this in production
      },
    });
  }

  static getInstance(config: Knex.Config) {
    if (!this.instance) {
      this.instance = new Database(config);
    }
    return this.instance;
  }

  select(...args: string[]) {
    this.knexQuery = this.knexQuery.select(...args);
    return this.knexQuery;
  }

  from(table: string) {
    this.knexQuery = this.knexQuery.from(table);
    return this.knexQuery;
  }

  toSQL(): Knex.Sql {
    return this.knexQuery.toSQL();
  }

  toNative(): Knex.SqlNative {
    return this.knexQuery.toSQL().toNative();
  }

  toQuery(): string {
    return this.knexQuery.toQuery();
  }

  async disconnect() {
    await this.client.destroy();
    this.logger.info('Database disconnected');
  }
}
