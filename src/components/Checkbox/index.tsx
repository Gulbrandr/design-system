import React, { HTMLProps, useEffect, useRef } from 'react';
import { HiCheck, HiMinus } from 'react-icons/hi';

const DataGridCheckbox = ({
  indeterminate,
  checked = false,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      if (ref.current) {
        ref.current.indeterminate = !checked && indeterminate;
      }
    }
  }, [ref, indeterminate, checked]);

  return (
    <label className="flex items-center justify-center w-5 h-5 cursor-pointer ">
      {checked && (
        <HiCheck className="w-5 h-5 text-white border rounded-md bg-primary-500 border-primary-500 drop-shadow" />
      )}
      {indeterminate && (
        <HiMinus className="w-5 h-5 text-white border rounded-md shadow bg-fenrir border-fenrir" />
      )}
      {!checked && !indeterminate && (
        <div className="w-5 h-5 border rounded-md shadow border-dark-200"></div>
      )}
      <input
        type="checkbox"
        ref={ref}
        checked={checked || false}
        className="hidden"
        {...rest}
      />
    </label>
  );
};

export default DataGridCheckbox;
