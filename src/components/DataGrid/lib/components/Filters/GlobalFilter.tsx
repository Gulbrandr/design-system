import React, { useState, useMemo, useRef, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import { ColumnDef } from '@tanstack/react-table';
import useDebounce from '@/hooks/useDebounce';

type SearchInputProps<T> = {
  placeholder: string;
  dataSource: T[];
  columns: ColumnDef<T, string>[];
  visibleData: T[];
  setVisibleData: (data: T[] | []) => void;
  searchText: string;
  setSearchText: (text: string) => void;
};

type SearchableColumns<T> = {
  accessorKey: string;
  id: string;
  meta?: {
    searchable?: boolean;
  };
} & ColumnDef<T, string>;

function isDate(input: string): boolean {
  const dateFormats = [
    'MM-DD-YYYY',
    'YYYY-MM-DD',
    'DD-MM-YYYY',
    'MM.DD.YYYY',
    'YYYY.MM.DD',
    'DD.MM.YYYY',
    'YYYY-MM-DDTHH:mm:ss.sssZ',
    'D MMMM YYYY',
  ];

  for (const format of dateFormats) {
    const date = new Date(
      input
        .replace(/-/g, '/')
        .replace(/,/g, '')
        .replace(/\./g, '/')
        .replace('T', ' ')
    );
    const isValid = !isNaN(date.getTime()) && dateFormats.includes(format);
    if (isValid) {
      return true;
    }
  }

  return false;
}

export default function SearchInput<T>({
  placeholder,
  dataSource,
  columns,
  setVisibleData,
  searchText,
  setSearchText,
}: SearchInputProps<T>) {
  const debouncedValue = useDebounce(searchText, 150);
  const searchableColumns = useMemo(() => {
    const searchableColumns = columns as SearchableColumns<T>[];
    return searchableColumns.reduce((result, { accessorKey, id, meta }) => {
      if (accessorKey) {
        result.push(accessorKey);
      }
      if (meta) {
        if (!meta.searchable) {
          return result;
        }
        if (meta.searchable && id) {
          result.push(id);
        }
      }

      return result;
    }, [] as string[]);
  }, [columns]);

  const onSearchChange = async (value: string) => {
    if (!value) {
      setVisibleData(dataSource);
      return;
    }
    const Fuse = (await import('fuse.js')).default;
    const fuse = new Fuse(dataSource, {
      isCaseSensitive: false,
      findAllMatches: true,
      threshold: 0.25,
      location: 0,
      distance: 50,
      keys: searchableColumns,
    });

    const searchResults = fuse.search(value).map((item) => {
      return item.item;
    });

    setVisibleData(searchResults);
  };

  useEffect(() => {
    onSearchChange(debouncedValue as string);
  }, [debouncedValue]);

  return (
    <div className="flex items-center w-full gap-1 py-2 border rounded cursor-pointer md:w-80 border-g-dark-200">
      <HiSearch className="ml-2 text-2xl text-gray-500" />
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full p-2 border border-transparent focus:ring-0 focus:border-transparent focus:outline-none text-body-2 text-dark-500"
        placeholder={placeholder || 'Search All Columns in Table...'}
        aria-label={placeholder || 'Search All Columns in Table...'}
      />
    </div>
  );
}
