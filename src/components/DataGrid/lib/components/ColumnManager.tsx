import React, { useState, useMemo } from 'react';
import { ColumnMeta, Table } from '@tanstack/react-table';
import Checkbox from './ui/Checkbox';
import { HiLockClosed, HiOutlineViewColumns } from 'react-icons/hi2';
import Modal from './ui/Modal';

type ColumnManagerProps<T> = {
  table: Table<T>;
};

type meta<T> = ColumnMeta<T, unknown>;

export default function ColumnManager<T>({ table }: ColumnManagerProps<T>) {
  const [searchText, setSearchText] = useState('');
  const [haveColumnsBeenAdded, setHaveColumnsBeenAdded] = useState(false);

  const tags = useMemo(() => {
    return table
      .getAllLeafColumns()
      .map((column) => column.columnDef.meta?.['tag' as keyof meta<T>])
      .filter((tag) => tag !== undefined)
      .filter((tag, index, self) => self.indexOf(tag) === index);
  }, []);

  const manageableColumns = useMemo(() => {
    return table
      .getAllLeafColumns()
      .filter((column) => {
        return column.columnDef.meta?.['manageable' as keyof meta<T>] !== false;
      })
      .sort((a, b) => {
        return String(a.columnDef.meta?.['tag' as keyof meta<T>]) >
          String(b.columnDef.meta?.['tag' as keyof meta<T>])
          ? -1
          : 1;
      })
      .filter((column) => {
        return String(column.columnDef.header)
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
  }, [table, table.getAllLeafColumns(), searchText]);

  return (
    <Modal
      ModalButton={() => (
        <div className="flex items-center gap-2 px-5 py-2.5 border rounded text-g-primary-400 bg-white border-g-primary whitespace-nowrap text-body-3-bold">
          <HiOutlineViewColumns className="w-5 h-5 " />{' '}
          {haveColumnsBeenAdded ? 'Manage Columns' : 'Add Columns'}
        </div>
      )}
      onOpen={() => {
        if (!haveColumnsBeenAdded) {
          setHaveColumnsBeenAdded(true);
        }
      }}
      title="Manage Columns"
      subTitle="Select the columns you'd like to see in this table."
    >
      <div className="flex flex-col w-full max-w-xl">
        <p className="w-full text-secondary-500 text-body-2-semibold">
          Default Columns
        </p>

        <div className="flex flex-col w-full overflow-x-scroll max-h-96 h-96">
          <div className="flex flex-col w-full gap-1 py-2 ">
            <div className="flex flex-wrap items-start h-16 gap-2">
              {manageableColumns.map((column) => (
                <>
                  {column.columnDef.meta?.['tag' as keyof meta<T>] ===
                    undefined &&
                  !column.columnDef.meta?.['searchable' as keyof meta<T>] ? (
                    <div
                      key={column.id + column.columnDef.header}
                      className="flex items-center w-full py-1 ml-2 text-sm bg-white rounded cursor-pointer max-w-fit text-dark-500 hover:bg-dark-100"
                    >
                      <label className="flex w-full gap-2 text-sm text-body-3">
                        <>
                          {column.columnDef.meta?.[
                            'locked' as keyof meta<T>
                          ] ? (
                            <HiLockClosed className="w-5 h-5 text-gray-500" />
                          ) : (
                            <Checkbox
                              {...{
                                checked: column.getIsVisible(),
                                onChange: column.getToggleVisibilityHandler(),
                              }}
                            />
                          )}
                          {column.columnDef.header}
                        </>
                      </label>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
            <p className="w-full text-secondary-500 text-body-2-semibold">
              Other Columns
            </p>

            <div className="flex w-full gap-6">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex flex-col px-2 py-1 mb-2 tracking-wider text-left text-gray-700 capitalize text-body-2-semibold "
                >
                  {tag}
                  {manageableColumns.map((column) => (
                    <>
                      {column.columnDef.meta?.['tag' as keyof meta<T>] ===
                      tag ? (
                        <div
                          key={column.id}
                          className="flex items-center w-full py-1 text-sm font-medium bg-white rounded cursor-pointer text-dark-500 hover:bg-g-dark-100"
                        >
                          <label className="flex w-full gap-2 text-sm text-body-3">
                            <>
                              {column.columnDef.meta?.[
                                'locked' as keyof meta<T>
                              ] ? (
                                <HiLockClosed className="w-5 h-5 text-gray-500" />
                              ) : (
                                <Checkbox
                                  {...{
                                    checked: column.getIsVisible(),
                                    onChange:
                                      column.getToggleVisibilityHandler(),
                                  }}
                                />
                              )}
                              {column.columnDef.header}
                            </>
                          </label>
                        </div>
                      ) : null}
                    </>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
