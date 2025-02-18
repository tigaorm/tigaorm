import knex, { type Knex } from 'knex';
import pino, { Logger } from 'pino';

export default class Database {
  private knexQuery: Knex.QueryBuilder;
  private client: Knex;
  private logger: Logger;

  constructor(config: Knex.Config) {
    this.client = knex(config);
    this.knexQuery = this.client.select();
    this.logger = pino.default({
      transport: {
        target: 'pino-pretty', // TODO: Remove this in production
      },
    });
  }

  select(...args: string[]) {
    this.knexQuery.select(...args);

    return this;
  }

  from(table: string) {
    this.knexQuery.from(table);

    return this;
  }

  async execute() {
    return this.knexQuery;
  }

  toSQL(): string {
    return this.knexQuery.toSQL().sql;
  }

  async disconnect() {
    await this.client.destroy();
    this.logger.info('Database disconnected');
  }
}
