import knex, { type Knex } from 'knex';
import pino, { Logger } from 'pino';

export default class Database {
  private client: Knex;
  private logger: Logger;

  constructor(config: Knex.Config) {
    this.client = knex(config);
    this.logger = pino.default({
      transport: {
        target: 'pino-pretty', // TODO: Remove this in production
      },
    });
  }

  async connect() {
    try {
      await this.client.raw('SELECT 1');
      this.logger.info('Database connected');
    } catch (e) {
      this.logger.error((e as Error).message);
    }
  }

  async disconnect() {
    await this.client.destroy();
  }
}
