import { Transition } from '@headlessui/react';
import { ColumnDef, flexRender, Row, Table } from '@tanstack/react-table';
import {
  HiChevronUp,
  HiChevronDown,
  HiSortAscending,
  HiSortDescending,
} from 'react-icons/hi';
import {
  HiChevronUpDown,
  HiMinus,
  HiMinusCircle,
  HiPlus,
} from 'react-icons/hi2';
import Checkbox from '@/components/Checkbox';
import { Fragment } from 'react';

export type MetaColumn<T> = {
  meta: {
    hidden: boolean;
  };
} & ColumnDef<T, unknown>;

type TableProps<T> = {
  checkboxColumn?: boolean;
  table: Table<T>;
  dataSource: T[];
  placement?: 'Left' | 'Right' | 'Center';
  className: ClassNames;
  renderSubComponent?: ({ row }: subComponentProps<T>) => JSX.Element;
  expandedRow?: number | null;
  setExpandedRow?: (row: number) => void;
  expandColumn?: boolean;
  numberOfRows: number;
  isLoading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emptyStateMessage?: (props?: any) => JSX.Element | string;
};
type subComponentProps<T> = {
  row: Row<T>;
  [key: string]: any;
};

type ClassNames = {
  table: string;
  headerTr: string;
  headerTh: string;
  bodyTr: string;
  bodyTd: string;
};

export default function Grid<T>({
  table,
  checkboxColumn,
  dataSource,
  placement = 'Center',
  className,
  renderSubComponent,
  expandedRow,
  setExpandedRow,
  expandColumn,
  numberOfRows,
  isLoading,
  emptyStateMessage,
}: TableProps<T>) {
  return (
    <>
      <div className="sticky top-0 flex w-full h-px bg-dark-100" />
      <table className={className.table}>
        <thead>
          {table?.[`get${placement}HeaderGroups`]()?.map((headerGroup) => (
            <tr key={headerGroup.id + placement} className={className.headerTr}>
              {checkboxColumn && (
                <td className={className.headerTh}>
                  <Checkbox
                    {...{
                      checked: table.getIsAllRowsSelected(),
                      indeterminate: table.getIsSomeRowsSelected(),
                      onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                  />
                </td>
              )}
              {headerGroup.headers.map((header, index) => {
                return (
                  <Fragment key={header.id + index + placement}>
                    <th
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize(),
                        maxWidth: header.getSize(),
                      }}
                      className={className.headerTh}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex flex-row justify-between items-center'
                              : 'flex flex-row justify-between items-center',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}

                          {header.column.getCanSort() &&
                            ({
                              asc: <HiSortAscending className="w-20 " />,
                              desc: <HiSortDescending className="w-20 " />,
                            }[header.column.getIsSorted() as string] ?? (
                              <HiChevronUpDown className="w-20 text-lg text-white" />
                            ))}
                        </div>
                      )}
                    </th>
                  </Fragment>
                );
              })}
              {expandColumn && (
                <th
                  className={
                    className.headerTh + ' w-5 sticky right-0 bg-white'
                  }
                  style={{
                    width: 50,
                    maxWidth: 50,
                  }}
                ></th>
              )}
            </tr>
          ))}
        </thead>

        {table && !isLoading && (
          <tbody className="" style={{ minHeight: 500 }}>
            {table.getRowModel().rows.map((row, index) => {
              return (
                <Fragment key={row.id + index + placement}>
                  <tr className={className.bodyTr}>
                    {checkboxColumn && (
                      <td className={className.bodyTd}>
                        <Checkbox
                          {...{
                            checked: row.getIsSelected(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                          }}
                        />
                      </td>
                    )}
                    {row[`get${placement}VisibleCells`]().map((cell, index) => {
                      return (
                        <>
                          <td
                            key={cell.id}
                            className={className.bodyTd}
                            style={{
                              width: cell.column.getSize(),
                              maxWidth: cell.column.getSize(),
                            }}
                          >
                            <>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </>
                          </td>
                        </>
                      );
                    })}
                    {expandColumn && (
                      <td
                        className={`sticky   right-0 bg-white ${className.bodyTd} `}
                        style={{
                          width: 25,
                          maxWidth: 50,
                        }}
                      >
                        <button
                          onClick={() => {
                            setExpandedRow && setExpandedRow(index);
                          }}
                          type="button"
                          className="flex items-center justify-center w-full rounded-md"
                        >
                          {expandedRow === index ? (
                            <HiMinus className="w-20 text-lg text-primary-500" />
                          ) : (
                            <HiPlus className="w-20 text-lg text-primary-500" />
                          )}
                        </button>
                      </td>
                    )}
                  </tr>
                  <Transition
                    show={expandedRow === index}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="h-auto opacity-0"
                    enterTo="h-auto opacity-100 max-h-96"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="h-auto opacity-100"
                    leaveTo="h-auto opacity-0"
                    as="tr"
                  >
                    <td colSpan={row.getVisibleCells().length}>
                      {renderSubComponent && renderSubComponent({ row })}
                    </td>
                  </Transition>
                </Fragment>
              );
            })}
          </tbody>
        )}
        {!isLoading && dataSource.length === 0 && (
          <tr className="w-full border h-96 text-primary-500">
            <td
              className="w-full h-full mt-6 text-center "
              colSpan={table?.getVisibleLeafColumns().length}
            >
              <div className="flex flex-col items-center justify-center max-w-full">
                <div className="w-96 max-h-72">
                  {emptyStateMessage &&
                  typeof emptyStateMessage === 'string' ? (
                    <div>{emptyStateMessage}</div>
                  ) : (
                    <div>{emptyStateMessage && emptyStateMessage()}</div>
                  )}
                  {!emptyStateMessage && (
                    <div>
                      Currently there is no data to display refine your query.
                    </div>
                  )}
                </div>
              </div>
            </td>
          </tr>
        )}
        {isLoading &&
          Array.from({ length: numberOfRows }).map((_, i) => (
            <Fragment key={i}>
              <tbody className="animate-pulse">
                <tr className={className.bodyTr}>
                  <td
                    colSpan={table?.getVisibleLeafColumns().length}
                    className={className.bodyTd + 'w-full animate-pulse px-0'}
                  >
                    <div className="w-full h-4 bg-gray-300 rounded-md"></div>{' '}
                  </td>
                </tr>
              </tbody>
            </Fragment>
          ))}
      </table>
    </>
  );
}
