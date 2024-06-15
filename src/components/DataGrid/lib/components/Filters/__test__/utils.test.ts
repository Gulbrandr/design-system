import { Filter, FilterType } from '../../../types/filters';
import { filterData } from '../utils';

describe('filterData', () => {
  const data = [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 30, active: false },
    { id: 3, name: 'Charlie', age: 35, active: true },
  ];

  it('should return the original data when no filters are applied', async () => {
    const result = await filterData(data, []);
    expect(result).toEqual(data);
  });

  it('should filter the data based on a single string constraint', async () => {
    const filters = [
      {
        type: 'string',
        field: 'name',
        constraint: 'equals',
        parameters: { value: 'Alice' },
        caseSensative: false,
      },
    ];
    const result = await filterData(data, filters as any);
    expect(result).toEqual([{ id: 1, name: 'Alice', age: 25, active: true }]);
  });

  it('should filter the data based on multiple string constraints', async () => {
    const filters = [
      {
        type: 'string',
        field: 'name',
        constraint: 'startsWith',
        parameters: { value: 'C' },
      },
      {
        type: 'string',
        field: 'name',
        constraint: 'notContains',
        parameters: { value: 'o' },
      },
    ];
    const result = await filterData(data, filters as any);
    expect(result).toEqual([{ id: 3, name: 'Charlie', age: 35, active: true }]);
  });

  it('should filter the data based on a single number constraint', async () => {
    const filters = [
      {
        type: 'number',
        field: 'age',
        constraint: 'greaterThanOrEqual',
        parameters: { value: 30 },
      },
    ];
    const result = await filterData(data, filters as any);
    expect(result).toEqual([
      { id: 2, name: 'Bob', age: 30, active: false },
      { id: 3, name: 'Charlie', age: 35, active: true },
    ]);
  });

  it('should filter the data based on a single boolean constraint', async () => {
    const filters = [
      {
        type: 'boolean',
        field: 'active',
        constraint: 'equals',
        parameters: { value: true },
      },
    ];
    const result = await filterData(data, filters as any);
    expect(result).toEqual([
      { id: 1, name: 'Alice', age: 25, active: true },
      { id: 3, name: 'Charlie', age: 35, active: true },
    ]);
  });
});
