import Toggle from '@/components/Toggle';
import { Column, ColumnDef, ColumnMeta, Table } from '@tanstack/react-table';
import { useState, useEffect, useMemo, useRef } from 'react';
import { HiOutlineFilter, HiOutlineX } from 'react-icons/hi';
import { isNumber } from '../../utils';
import Checkbox from '../ui/Checkbox';
import type { Constraint, FilterType, Filter } from '../../types/filters';
import { filterData } from './utils';
import { Datum } from '../../types';

type ColumnFiltersProps<T extends Datum> = {
  table: Table<T>;
  dataSource: T[];
  visibleData: T[];
  setVisibleData: (data: T[]) => void;
  setSearchText: (text: string) => void;
};

type meta<T> = ColumnMeta<T, unknown>;

export default function ColumnFilters<T extends Datum>({
  table,
  dataSource,
  visibleData,
  setVisibleData,
  setSearchText,
}: ColumnFiltersProps<T>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | string>(null);
  const [type, setType] = useState<
    | 'string'
    | 'number'
    | 'date'
    | 'boolean'
    | 'array'
    | 'object'
    | 'function'
    | 'symbol'
    | 'bigint'
    | 'undefined'
    | 'SELECT'
  >('undefined');

  useEffect(() => {
    // checks to see if the selected column has a filterType override in the meta before it try's to set the type.
    // if it doesn't it will try to set the type to the type of the first item in the data source

    if (selected) {
      const col = table
        .getAllLeafColumns()
        .find(
          (column) =>
            column.id === selected ||
            column.columnDef?.['accessorKey' as keyof ColumnDef<T, unknown>] ===
              selected
        );
      const filterType = col?.columnDef?.meta?.['filterType' as keyof meta<T>];
      if (filterType) {
        setType(filterType);
      } else {
        if (isNumber(visibleData[0]?.[selected as keyof T])) setType('number');
        else setType(typeof visibleData[0]?.[selected as keyof T]);
      }
    }
  }, [selected]);

  const [filters, setFilters] = useState<Filter<T>[]>([]);

  const addFilter = (filter: Filter<T>) => {
    setFilters((prev) => {
      return [...prev, filter];
    });
  };
  const removeFilter = (filter: Filter<T>) => {
    setFilters((prev) => {
      return prev.filter((item) => item !== filter);
    });
  };

  useEffect(() => {
    if (filters.length === 0) {
      setVisibleData(dataSource);
    } else {
      setSearchText('');
      filterData(dataSource, filters).then((data) => {
        setVisibleData(data);
      });
    }

    return () => {
      filterData;
    };
  }, [filters]);

  useEffect(() => {
    if (dataSource) {
      if (filters.length === 0) {
        setVisibleData(dataSource);
      } else {
      }
    }
  }, [dataSource]);

  return (
    <div className="relative">
      <div className="flex items-center h-12 gap-2 ">
        <button
          type="button"
          aria-label="Export CSV"
          className="flex items-center gap-2 px-2 py-1 border rounded text-g-dark-400 border-g-dark-200 whitespace-nowrap text-body-3"
          onClick={() => setOpen(!open)}
        >
          <HiOutlineFilter className="w-4.5 h-4.5" /> <span>Filters</span>{' '}
          {filters.length > 0 && (
            <span className="flex justify-center w-4 items-center h-4  rounded-full bg-primary-500 text-light text-body-3 text-[10px]">
              {filters.length}
            </span>
          )}
        </button>
        {filters.length > 0 &&
          filters.map((filter) => (
            <div className="flex items-center gap-2 px-1 py-1 capitalize border rounded text-g-dark-400 border-g-dark-200 whitespace-nowrap text-body-3">
              <span>{filter.field as string}</span>

              <button
                type="button"
                aria-label="remove filter"
                className="flex items-center gap-2 px-1 py-1 text-g-dark-400 whitespace-nowrap text-body-3"
                onClick={() => removeFilter(filter)}
              >
                <HiOutlineX className="w-4.5 h-4.5" />
              </button>
            </div>
          ))}
      </div>
      {open && (
        <div className="absolute left-0 z-10 w-64 px-4 py-2 bg-white border rounded shadow top-10 border-g-dark-200">
          <div className="flex flex-col w-full h-full gap-2">
            <label className="flex flex-col w-full h-full gap-1 text-body-3-bold text-g-dark-400">
              Filter by
              {table.getAllLeafColumns().map((column) => {
                let header;
                if (column.columnDef.meta?.['searchable' as keyof meta<T>]) {
                  header =
                    column.columnDef.meta?.['filterLabel' as keyof meta<T>] ||
                    '';
                } else {
                  header =
                    column.columnDef.meta?.['filterLabel' as keyof meta<T>] ||
                    column.columnDef.header;
                }

                if (!column.getIsVisible()) return null;
                return (
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      className="focus:ring-0 focus:outline-0"
                      checked={
                        selected ===
                        String(
                          column.columnDef?.[
                            'accessorKey' as keyof ColumnDef<T, unknown>
                          ] || column.columnDef.id
                        )
                      }
                      onChange={() => {
                        let select = String(
                          column.columnDef?.[
                            'accessorKey' as keyof ColumnDef<T, unknown>
                          ]
                        );
                        if (select === 'undefined')
                          select = String(column?.columnDef?.id);
                        setSelected(select);
                      }}
                    />
                    <span className="text-body-3">{header as string}</span>
                  </label>
                );
              })}
            </label>

            {type === 'string' && (
              <StringFilter
                addFilter={addFilter}
                field={selected as string}
                setOpen={setOpen}
              />
            )}
            {/* {type === 'number' && <NumberFilter />}
            {type === 'boolean' && BooleanFilter({ value: true })}
            {type === 'date' && DateFilter({ value: new Date() })}
            {type === 'array' && NoFilterAvailable()}
            {type === 'object' && NoFilterAvailable()}
            {type === 'function' && NoFilterAvailable()}
            {type === 'symbol' && NoFilterAvailable()}
            {type === 'bigint' && NoFilterAvailable()}
            {type === 'undefined' ? (
              <span className="text-body-3-semibold text-g-dark-400">
                Select a Column To Filter By
              </span>
            ) : null} */}
          </div>
        </div>
      )}
    </div>
  );
}

// export function NumberFilter<T>(props: Omit<ColumnFiltersProps<T>, 'table'>) {
//   return <span className="text-g-dark-400">{props.value} </span>;
// }

type FilterComponentProps<T> = {
  addFilter: (filter: Filter<T>) => void;
  field: string;
  setOpen: (close: boolean) => void;
};

export function StringFilter<T>({
  addFilter,
  field,
  setOpen,
}: FilterComponentProps<T>) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [caseSensitive, setCaseSensitive] = useState(false);

  return (
    <>
      <label className="flex flex-col w-full h-full gap-1 text-body-3-bold text-g-dark-400">
        <span className="flex justify-between">
          <span>Filter type</span>{' '}
        </span>
        <select
          ref={selectRef}
          className="w-full h-10 bg-white border rounded text-g-dark-400 border-g-dark-200 text-body-3"
        >
          <option value="contains">Contains</option>
          <option value="does not contain">Does not contain</option>
          <option value="is">Is</option>
          <option value="is not">Is not</option>
          <option value="starts with">Starts with</option>
          <option value="ends with">Ends with</option>
          <option value="is empty">Is empty</option>
          <option value="is not empty">Is not empty</option>
        </select>
      </label>

      <label className="flex flex-col w-full h-full gap-1 text-body-3-bold text-g-dark-400">
        Filter value
        <input
          ref={inputRef}
          className="w-full h-10 px-4 bg-white border rounded text-g-dark-400 border-g-dark-200 text-body-3"
          autoFocus
        />
      </label>
      <span className="flex items-center justify-between w-full gap-1 text-body-3-bold text-g-dark-400">
        Case Sensitive
        <Checkbox
          {...{
            checked: caseSensitive,
            onChange: () => setCaseSensitive(!caseSensitive),
          }}
        />
      </span>
      <button
        type="button"
        className="flex items-center justify-center w-full h-10 px-4 text-white rounded bg-g-primary"
        onClick={() => {
          addFilter({
            type: 'string',
            field: field as keyof T,
            constraint: selectRef?.current?.value as Constraint,
            parameters: {
              value: inputRef.current?.value as string,
            },
            caseSensitive: caseSensitive as boolean,
          });
          setOpen(false);
        }}
      >
        <span className="text-body-3-semibold">Apply</span>
      </button>
    </>
  );
}

export function NumberFilter<T>(props: FilterComponentProps<T>) {
  return <span className="text-g-dark-400">NUMBER</span>;
}

export function BooleanFilter<T>(props: FilterComponentProps<T>) {
  return <span className="text-g-dark-400">BOOLEAN</span>;
}

export function DateFilter<T>(props: FilterComponentProps<T>) {
  return <span className="text-g-dark-400">DATE</span>;
}

export function NoFilterAvailable() {
  return <span className="text-g-dark-400">No filter available</span>;
}
