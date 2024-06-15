// import { useState } from 'react'
import { Switch as Toggle } from '@headlessui/react';
import { ForwardedRef } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type SwitchProps = {
  label: string;
  onChange: (value: boolean) => void;
  checked: boolean;
};

const Switch = ({ label, onChange, checked }: SwitchProps) => {
  const setValue = (data: boolean) => {
    onChange(data);
  };

  return (
    <Toggle.Group as="div" className="flex items-center">
      <Toggle.Label as="span" className="mr-3">
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </Toggle.Label>
      <Toggle
        checked={checked}
        onChange={setValue}
        className={classNames(
          checked ? 'bg-primary-500' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none '
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            checked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Toggle>
    </Toggle.Group>
  );
};

export default Switch;
