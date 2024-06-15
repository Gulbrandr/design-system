import React, { useState, useEffect } from 'react';
import { HiCheck, HiChevronDown, HiMagnifyingGlass } from 'react-icons/hi2';
import { Combobox } from '@headlessui/react';

import { Field, useField } from 'formik';
function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}
export interface FilterComboboxProps<T> {
  options: T[];
  selectKey?: keyof T;
  name: string;
  label?: string;
  placeholder?: string;
}
export default function FilterCombobox<T>({
  options,
  selectKey = 'displayName' as keyof T,
  name,
  label,
  placeholder,
}: FilterComboboxProps<T>) {
  const [input, meta, helpers] = useField(name);

  const [searchTerm, setSearchTerm] = useState('');

  const [selected, setSelected] = useState<T | null>(null);
  const [filteredData, setFilteredData] = useState<T[] | null | undefined>(
    options
  );

  useEffect(() => {
    if (searchTerm && options) {
      const results = options.filter((option) =>
        String(option[selectKey])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredData(results);
    }
  }, [searchTerm, options]);
  useEffect(() => {
    setSelected(input.value || null);
  }, [input.value]);

  return (
    <label className="relative">
      {label}
      <div className="flex items-center border border-transparent  w-96 max-w-full bg-white shadow-g-input p-2  text-body-2">
        <HiMagnifyingGlass
          className="h-5 w-5 text-gray-400 "
          aria-hidden="true"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-transparent focus:ring-0 focus:border-transparent focus:outline-none text-body-2 p-2 text-dark-500"
          placeholder={placeholder}
          autoComplete="off"
        />
        {input.value && (
          <button
            type="button"
            className="text-caption uppercase text-g-dark-400"
            onClick={() => {
              helpers.setValue(null);
              setSearchTerm('');
            }}
          >
            CLEAR
          </button>
        )}
      </div>
      {searchTerm && !selected && filteredData && filteredData.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-g-input border border-gray-200 rounded-b-md transition-opacity ease-linear duration-300">
          {filteredData.map((option, index) => (
            <button
              key={index}
              type="button"
              className={classNames(
                option[selectKey] === input.value
                  ? 'text-g-dark-500 bg-g-light-100'
                  : 'text-g-dark-400',
                'group flex items-center w-full p-3 text-sm font-medium rounded-md'
              )}
              onClick={() => helpers.setValue(option)}
            >
              <span className="truncate">{option[selectKey] as string}</span>
              {option[selectKey] === input.value && (
                <HiCheck
                  className="ml-3 flex-shrink-0 h-5 w-5 text-g-dark-500"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </label>
  );
}
