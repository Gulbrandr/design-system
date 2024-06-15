export type Constraint =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'between'
  | 'notBetween'
  | 'in'
  | 'notIn'
  | 'null'
  | 'notNull';
export type FilterType =
  | 'string'
  | 'number'
  | 'date'
  | 'boolean'
  | 'array'
  | 'object'
  | 'function'
  | 'symbol'
  | 'bigint'
  | 'undefined';

export type Filter<T> =
  | StringFilter<T>
  | NumberFilter<T>
  | DateFilter<T>
  | BooleanFilter<T>
  | EnumFilter<T>;

type StringFilter<T> = {
  type: 'string';
  constraint:
    | 'equals'
    | 'notEquals'
    | 'contains'
    | 'notContains'
    | 'startsWith'
    | 'endsWith'
    | 'in'
    | 'notIn'
    | 'null'
    | 'notNull';
  field: keyof T;
  comparables: {
    value: string;
  };
  caseSensitive?: boolean;
};
export type NumberFilter<T> = {
  type: 'number';
  constraint:
    | 'equals'
    | 'notEquals'
    | 'greaterThan'
    | 'lessThan'
    | 'greaterThanOrEqual'
    | 'lessThanOrEqual'
    | 'between'
    | 'null'
    | 'notNull';
  field: keyof T;
  comparables: {
    value: number;
    from?: number;
    to?: number;
  };
};
export type DateFilter<T> = {
  type: 'date';
  constraint:
    | 'equals'
    | 'notEquals'
    | 'greaterThan'
    | 'lessThan'
    | 'greaterThanOrEqual'
    | 'lessThanOrEqual'
    | 'between'
    | 'null'
    | 'notNull';
  field: keyof T;
  comparables: {
    value: Date;
    from?: Date;
    to?: Date;
  };
};
export type BooleanFilter<T> = {
  type: 'boolean';
  constraint: 'equals' | 'notEquals';
  field: keyof T;
  comparables: {
    value: boolean;
  };
};
export type EnumFilter<T> = {
  type: 'enum';
  constraint: 'equals' | 'notEquals' | 'in' | 'notIn';
  field: keyof T;
  comparables: {
    value: T[keyof T];
    values: T[keyof T][];
  };
};
