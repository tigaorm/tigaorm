import { type Knex } from 'knex';

class QueryBuilder {
  private knexQuery: Knex.QueryBuilder;

  constructor(knexQuery: Knex.QueryBuilder) {
    this.knexQuery = knexQuery;
  }

  private handleWhereClause(
    method: 'where' | 'andWhere' | 'orWhere' | 'whereNot' | 'orWhereNot' | 'andWhereNot',
    columnOrCallback: string | ((query: Knex.QueryBuilder) => void),
    operator?: string,
    value?: Knex.Value,
  ) {
    if (typeof columnOrCallback === 'function') {
      this.knexQuery = this.knexQuery[method]((qb) => {
        columnOrCallback(qb);
      });
    } else if (operator && value !== undefined) {
      this.knexQuery = this.knexQuery[method](columnOrCallback as string, operator, value);
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

  from(table: string) {
    this.knexQuery = this.knexQuery.from(table);
    return this;
  }

  getKnexQuery() {
    return this.knexQuery;
  }

  toQuery(): string {
    return this.knexQuery.toQuery();
  }

  toSQL(): Knex.Sql {
    return this.knexQuery.toSQL();
  }

  toNative(): Knex.SqlNative {
    return this.knexQuery.toSQL().toNative();
  }
}

export default QueryBuilder;
