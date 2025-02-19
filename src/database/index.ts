import knex, { type Knex } from 'knex';
import pino, { Logger } from 'pino';

export default class Database {
  private knexQuery: Knex.QueryBuilder | null = null;
  private client: Knex | null;
  private logger: Logger;
  private config: Knex.Config;

  constructor(config: Knex.Config) {
    this.config = config;
    this.client = knex(config);
    this.logger = pino.default({
      transport: {
        target: 'pino-pretty', // TODO: Remove this in production
      },
    });

    this.logger.info('Database connected');

    this.client.on('query', (query) => {
      this.logger.info(query.sql);
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

  private handleWhereClause(
    method: 'where' | 'andWhere' | 'orWhere' | 'whereNot' | 'orWhereNot' | 'andWhereNot',
    columnOrCallback: string | ((query: Knex.QueryBuilder) => void),
    operator?: string,
    value?: Knex.Value,
  ) {
    if (typeof columnOrCallback === 'function') {
      this.knexQuery = this.getKnexQuery()![method]((qb) => {
        columnOrCallback(qb);
      });
    } else if (operator && value !== undefined) {
      this.knexQuery = this.getKnexQuery()![method](columnOrCallback as string, operator, value);
    } else {
      throw new Error(`Invalid arguments for ${method} clause`);
    }
    return this;
  }

  where(
    columnOrCallback: string | ((query: Knex.QueryBuilder) => void),
    operator?: string,
    value?: Knex.Value,
  ) {
    return this.handleWhereClause('where', columnOrCallback, operator, value);
  }

  andWhere(
    columnOrCallback: string | ((query: Knex.QueryBuilder) => void),
    operator?: string,
    value?: Knex.Value,
  ) {
    return this.handleWhereClause('andWhere', columnOrCallback, operator, value);
  }

  orWhere(
    columnOrCallback: string | ((query: Knex.QueryBuilder) => void),
    operator?: string,
    value?: Knex.Value,
  ) {
    return this.handleWhereClause('orWhere', columnOrCallback, operator, value);
  }

  whereNot(
    columnOrCallback: string | ((query: Knex.QueryBuilder) => void),
    operator?: string,
    value?: Knex.Value,
  ) {
    return this.handleWhereClause('whereNot', columnOrCallback, operator, value);
  }

  orWhereNot(
    columnOrCallback: string | ((query: Knex.QueryBuilder) => void),
    operator?: string,
    value?: Knex.Value,
  ) {
    return this.handleWhereClause('orWhereNot', columnOrCallback, operator, value);
  }

  andWhereNot(
    columnOrCallback: string | ((query: Knex.QueryBuilder) => void),
    operator?: string,
    value?: Knex.Value,
  ) {
    return this.handleWhereClause('andWhereNot', columnOrCallback, operator, value);
  }

  limit(value: number) {
    if (!this.knexQuery) {
      throw new Error('No query has been built yet. Call select() or from() first.');
    }
    this.knexQuery = this.knexQuery.limit(value);
    return this;
  }

  offset(value: number) {
    if (!this.knexQuery) {
      throw new Error('No query has been built yet. Call select() or from() first.');
    }
    this.knexQuery = this.knexQuery.offset(value);
    return this;
  }

  orderBy(column: string, direction: 'asc' | 'desc' = 'asc') {
    if (!this.knexQuery) {
      throw new Error('No query has been built yet. Call select() or from() first.');
    }
    this.knexQuery = this.knexQuery.orderBy(column, direction);
    return this;
  }

  forPage(page: number, perPage: number): this {
    if (!this.knexQuery) {
      throw new Error('No query has been built yet. Call select() or from() first.');
    }
    this.knexQuery = this.knexQuery.offset((page - 1) * perPage).limit(perPage);
    return this;
  }

  async first<T = unknown>(): Promise<T | null> {
    if (!this.knexQuery) {
      throw new Error('No query has been built yet. Call select() or from() first.');
    }
    this.knexQuery = this.knexQuery.limit(1);
    const result = await this.exec();
    return (result[0] as T) || null;
  }

  async firstOrFail<T = unknown>(): Promise<T> {
    const result = await this.first<T>();
    if (!result) {
      throw new Error('No result found');
    }
    return result;
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
  async exec<T = unknown>(): Promise<T[]> {
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
