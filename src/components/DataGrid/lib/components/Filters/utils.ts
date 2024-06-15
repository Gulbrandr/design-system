import { rankItem, compareItems } from '@tanstack/match-sorter-utils';
import {
  FilterFn,
  FilterMeta,
  SortingFn,
  sortingFns,
} from '@tanstack/react-table';
import { Datum } from '../../types';
import type {
  StringFilter,
  NumberFilter,
  DateFilter,
  BooleanFilter,
  EnumFilter,
  Filter,
} from '../../types/filters';

/**
 *
 *  @param dataSource - The data source to filter.
 *  @param filters - The filters to apply to the data source.
 *
 *  @summary Filters the data source based on the filters provided.
 *  @description Filters the data source based on the filters provided.
 *  The filters are applied in the order they are provided.
 *   A filter is an object with the following properties:
 *    - type: The type of the field to filter.
 *    - constraint: The constraint to apply to the filter.
 *      - equals
 *      - notEquals
 *      - contains
 *      - notContains
 *      - startsWith
 *      - endsWith
 *      - greaterThan
 *      - lessThan
 *      - greaterThanOrEqual
 *      - lessThanOrEqual
 *      - between
 *    - field: The field to filter.
 *    - parameters: The parameters to apply to the filter.
 *    - caseSensitive: Whether or not the filter is case sensitive.
 *
 *  @returns The filtered data source.
 *
 *
 */

export async function filterData<T extends Datum>(
  dataSource: T[],
  filters: Filter<T>[]
): Promise<T[]> {
  let _data = dataSource;
  filters.forEach((filter: Filter<T>) => {
    const { constraint, type, field, comparables } = filter;
    const caseSensitive = filter?.['caseSensitive' as keyof Filter<T>] || false;

    switch (type) {
      case 'string':
        _data = dataSource.filter((record) => {
          const _record = caseSensitive
            ? String(record[field])
            : String(record[field]).toLowerCase();
          const _value = caseSensitive
            ? String(comparables.value)
            : String(comparables.value).toLowerCase();
          return applyStringFilter(constraint, _record, _value);
        });
        break;
      case 'number':
        _data = dataSource.filter((record) => {
          const _record = Number(record[field]);
          const _value = Number(comparables.value);
          const _from = comparables.from ? Number(comparables.from) : undefined;
          const _to = comparables.to ? Number(comparables.to) : undefined;

          return applyNumberFilter(constraint, _record, _value, _from, _to);
        });
        break;
      case 'date':
        _data = dataSource.filter((record) => {
          const _record = new Date(record[field] as string);
          const _value = new Date(comparables.value);
          const _from = comparables.from
            ? new Date(comparables.from)
            : undefined;
          const _to = comparables.to ? new Date(comparables.to) : undefined;
          return applyDateFilter(constraint, _record, _value, _from, _to);
        });
        break;
      case 'boolean':
        _data = dataSource.filter((record) => {
          const _record = Boolean(record[field]);
          const _value = Boolean(comparables.value);
          return applyBooleanFilter(constraint, _record, _value);
        });
        break;
      case 'enum':
        _data = dataSource.filter((record) => {
          const _record = record[field];
          const _value = comparables.value;
          return applyEnumFilter(constraint, _record, _value);
        });
        break;
    }
  });
  return _data as T[];
}

export default { filterData };

function applyStringFilter<T>(
  constraint: StringFilter<T>['constraint'],
  item: string,
  value: string
): boolean {
  switch (constraint) {
    case 'equals':
      return item === value;
    case 'notEquals':
      return item !== value;
    case 'contains':
      return item.includes(value);
    case 'notContains':
      return !item.includes(value);
    case 'startsWith':
      return item.startsWith(value);
    case 'endsWith':
      return item.endsWith(value);
    case 'in':
      return value.includes(item);
    case 'notIn':
      return !value.includes(item);
    case 'null':
      return item === null;
    case 'notNull':
      return item !== null;
    default:
      return false;
  }
}

function applyNumberFilter<T>(
  constraint: NumberFilter<T>['constraint'],
  item: number,
  value: number,
  from?: number,
  to?: number
): boolean {
  switch (constraint) {
    case 'equals':
      return item === value;
    case 'notEquals':
      return item !== value;
    case 'greaterThan':
      return item > value;
    case 'lessThan':
      return item < value;
    case 'greaterThanOrEqual':
      return item >= value;
    case 'lessThanOrEqual':
      return item <= value;
    case 'between':
      return from !== undefined && to !== undefined
        ? item >= from && item <= to
        : false;
    case 'null':
      return item === null;
    case 'notNull':
      return item !== null;
    default:
      return false;
  }
}

function applyDateFilter<T>(
  constraint: DateFilter<T>['constraint'],
  item: Date,
  value: Date,
  from?: Date,
  to?: Date
): boolean {
  switch (constraint) {
    case 'equals':
      return item.getTime() === value.getTime();
    case 'notEquals':
      return item.getTime() !== value.getTime();
    case 'greaterThan':
      return item.getTime() > value.getTime();
    case 'lessThan':
      return item.getTime() < value.getTime();
    case 'greaterThanOrEqual':
      return item.getTime() >= value.getTime();
    case 'lessThanOrEqual':
      return item.getTime() <= value.getTime();
    case 'between':
      return from !== undefined && to !== undefined
        ? item >= from && item <= to
        : false;
    case 'null':
      return item === null;
    case 'notNull':
      return item !== null;
    default:
      return false;
  }
}

function applyBooleanFilter<T>(
  constraint: BooleanFilter<T>['constraint'],
  item: boolean,
  value: boolean
): boolean {
  switch (constraint) {
    case 'equals':
      return item === value;
    case 'notEquals':
      return item !== value;
    default:
      return false;
  }
}

function applyEnumFilter<T>(
  constraint: EnumFilter<T>['constraint'],
  item: T,
  value: T,
  values?: T[]
): boolean {
  switch (constraint) {
    case 'equals':
      return item === value;
    case 'notEquals':
      return item !== value;
    case 'in':
      return values !== undefined ? values.includes(item) : false;
    case 'notIn':
      return values !== undefined ? !values.includes(item) : false;
    default:
      return false;
  }
}
