import React, { useMemo, useEffect, useState, MouseEventHandler } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnMeta,
  ColumnPinningState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { exportCSV } from './utils';

import { Action } from './components/ActionRow';
import ColumnManager from './components/ColumnManager';
import { HiPlus } from 'react-icons/hi2';

export { formatCurrency, formatDate, formatEIN } from './formatters';
export { default as DataGridColumnMenu } from './components/ui/ColumnMenu';

import Grid from './components/Grid';
import Pagination from './components/Pagination';
import ColumnFilters from './components/Filters/ColumnFilters';
import SearchInput from './components/Filters/GlobalFilter';
import { Datum } from './types';

type DataGridProps<T extends Datum> = {
  /** Table Name */
  tableName?: string;
  /** Column Definitions
   * @example
   * const columns: ColumnDef<Row, string>[] = [
   *  {
   *   header: 'Name',
   *  accessor: 'name',
   * meta: {
   *  tag: 'Personal',
   *  manageable: true,
   * },...
   *
   *
   *
   */
  columns: ColumnDef<T, string>[];
  /** Data Source */

  dataSource: T[];
  /** Export to CSV */
  exportToCSV?: boolean;
  /** CSV Export Type 
   * 
   * @default 'raw'
   * ### Options
   * - 'raw' - Raw Data
   * - 'formatted' - Formatted Data

  */

  csvExportType?: 'raw' | 'formatted';
  /** Simple Search
   * @default true
   * - true - Show the search input
   * @description the search input is a simple search that searches all columns using `fuse.js`
   */
  simpleSearch?: boolean;
  simpleSearchPlaceholder?: string;
  checkboxColumn?: boolean;
  actions?: Action<T>[];
  isLoading?: boolean;
  emptyStateMessage?: (props?: any) => JSX.Element | string;
  numberOfRows?: number;
  maxHeight?: string;
  callToActionText?: string;
  callToActionOnClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * @description A function that returns a JSX.Element to be rendered as a sub component
   * @example
   * const SubComponent = ({ row }: { row?: Row<Person> }) => {
   * return (
   *    <div style={{ padding: '20px' }}>
   *      <p>
   *        <strong>First Name:</strong> {row?.original.firstName}
   *      </p>
   *      <p>
   *        <strong>Last Name:</strong> {row?.original.lastName}
   *      </p>
   *      <p>
   *        <strong>Age:</strong> {row?.original.age}
   *      </p>
   *    </div>
   * );
   */
  subComponent?: ({ row }: subComponentProps<T>) => JSX.Element;
  expandColumn?: boolean;
};
type subComponentProps<T> = {
  row: Row<T>;
  [key: string]: any;
};

type meta<T> = ColumnMeta<T, unknown>;

/**
 *
 * @param simpleSearch - Whether or not to show the search input
 * @param simpleSearchPlaceholder - Placeholder text for the search input
 * @param checkboxColumn - Whether or not to show the checkbox column
 * @param dataSource - The data to be displayed in the table
 * @param columns - The column array to be displayed in the table
 * @param exportCsv - Whether or not to export Raw Data in CSV Export
 * @param csvExportType - Whether to use the Table Rendered Data  or Raw Data in CSV Export
 * @param isLoading - Whether or not the table is loading
 * @param emptyStateMessage - Message to display when the table is empty
 * @param numberOfRows - Number of rows to display per page
 * @param maxHeight - Max height of the table
 * @param callToActionText - Text to display on the call to action button
 * @param callToActionOnClick - Function to call when the call to action button is clicked
 * @param subComponent - A function that returns a JSX.Element to be rendered as a sub component
 * @param expandColumn - Whether or not to show the expand column
 * @param actions - An array of actions to be displayed in the action column
 * @param tableName - The name of the table
 *
 *
 * @returns
 */

export default function DataGrid<T extends Datum>({
  simpleSearch,
  simpleSearchPlaceholder,
  tableName,
  columns,
  dataSource,
  exportToCSV,
  csvExportType = 'formatted',
  checkboxColumn = false,
  isLoading,
  emptyStateMessage,
  numberOfRows = 20,
  maxHeight = '500px',
  callToActionText,
  callToActionOnClick,
  subComponent,
  expandColumn,
}: DataGridProps<T>) {
  if (exportToCSV && !tableName) {
    throw new Error('Export to CSV requires table name property');
  }

  const [visibleData, setVisibleData] = useState<T[]>([] as T[]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: numberOfRows,
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    const selectedRows = Object.keys(rowSelection).map(
      (key) => dataSource[Number(key)]
    );
  }, [rowSelection, dataSource]);

  const table = useReactTable({
    data: visibleData || ([] as T[]),
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnPinning,
      columnVisibility,
    },
    manualExpanding: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnPinningChange: setColumnPinning as OnChangeFn<ColumnPinningState>,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange:
      setColumnVisibility as OnChangeFn<VisibilityState>,
    debugAll: process.env.NODE_ENV === 'development',
  });

  const handleExpandRow = (rowIndex: number) => {
    if (expandedRow === rowIndex) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowIndex);
    }
  };

  useEffect(() => {
    if (table.getAllLeafColumns().length === 0) {
      return;
    }
    table.getAllLeafColumns().forEach((column) => {
      if (column.columnDef.meta?.['hidden' as keyof meta<T>])
        column.toggleVisibility(false);
      if (column.columnDef.meta?.['pin' as keyof meta<T>]) {
        column.pin('left');
      }
    });
  }, [table]);

  return (
    <div
      data-testid="DataGrid"
      className="flex flex-col w-full h-full max-w-full text-body-3"
    >
      <h3 className="text-header-4 text-g-primary-500">{tableName}</h3>
      <div className="flex flex-row gap-2 px-3 py-2 min-h-20 ">
        <div className="flex items-center justify-between w-full h-full py-4 ">
          <ColumnFilters
            table={table}
            dataSource={dataSource}
            visibleData={visibleData}
            setVisibleData={setVisibleData}
            setSearchText={setGlobalSearch}
          />
          <div className="flex items-center justify-end gap-4 ml-auto ">
            <ColumnManager table={table} />
            {exportToCSV && tableName && (
              <button
                aria-label="Export CSV"
                className="flex items-center gap-2 px-5 py-2.5 border rounded text-g-dark-400 border-g-dark-200 whitespace-nowrap text-body-3-bold"
                onClick={() =>
                  exportCSV<T>({
                    table,
                    reportName: tableName,
                    csvExportType,
                    rawDataSource: dataSource,
                  })
                }
              >
                Export
              </button>
            )}
            {callToActionText && callToActionOnClick && (
              <>
                <button
                  aria-label="Export CSV"
                  className="items-center hidden gap-2 px-5 py-2.5 text-white border rounded sm:flex whitespace-nowrap text-body-3-bold bg-g-primary-500"
                  onClick={callToActionOnClick}
                >
                  {callToActionText}
                </button>
                <button
                  aria-label="Export CSV"
                  className="flex items-center gap-2 px-6 py-3 text-white border rounded sm:hidden whitespace-nowrap text-body-3-bold bg-g-primary-500"
                  onClick={callToActionOnClick}
                >
                  <HiPlus />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 bg-white border rounded border-dark-100 shadow-g-card">
        <div className="flex flex-col items-center justify-between w-full gap-2 md:flex-row">
          {simpleSearch && (
            <SearchInput
              placeholder={`${simpleSearchPlaceholder || 'Search...'}`}
              columns={columns}
              dataSource={dataSource}
              visibleData={visibleData}
              setVisibleData={setVisibleData}
              searchText={globalSearch}
              setSearchText={setGlobalSearch}
            />
          )}
          <div className="items-center hidden w-full gap-2 md:flex md:ml-auto md:justify-end">
            Showing:
            <label
              className="flex items-center gap-2 "
              htmlFor="selectRowsCount"
            >
              <select
                name="selectRowsCount"
                className="border-gray-300 rounded-md shadow-sm cursor-pointer text-caption focus:border-primary-300 focus:ring-0 focus:ring-primary-200 focus:ring-opacity-50 w-18"
                value={pagination.pageSize}
                onChange={(event) =>
                  setPagination({
                    ...pagination,
                    pageSize: Number(event.target.value),
                  })
                }
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={100}>100</option>
              </select>
              <span>{visibleData.length}</span>
              Results
            </label>
          </div>
        </div>

        {table && (
          <div className="relative border border-transparent scroll-smooth border-t-g-dark-100">
            <div
              className="relative flex overflow-auto "
              style={{
                maxHeight: maxHeight,
              }}
            >
              <>
                {columnPinning?.left && (
                  <div className="sticky left-0 z-20 h-full bg-white shadow-g-table">
                    <Grid
                      table={table}
                      dataSource={visibleData}
                      placement="Left"
                      checkboxColumn={checkboxColumn}
                      className={{
                        table: 'table-auto min-w-full ',
                        headerTr:
                          ' sticky top-0  text-g-primary-500 h-12 bg-white shadow-g-table-hr border border-transparent',
                        headerTh:
                          'truncate text-body-3-bold text-dark    px-4  align-middle sticky top-0  h-full  ',
                        bodyTr: 'h-12',
                        bodyTd:
                          ' truncate text-body-3 text-dark   px-4 py-2 align-middle ',
                      }}
                      numberOfRows={numberOfRows}
                      isLoading={isLoading}
                      emptyStateMessage={emptyStateMessage}
                    />
                  </div>
                )}
                <div
                  className={`sticky top-0 w-full h-full bg-white ${
                    columnPinning?.left && '-ml-0.5'
                  } `}
                >
                  <Grid
                    table={table}
                    dataSource={visibleData}
                    className={{
                      table: 'table-auto min-w-full ',
                      headerTr:
                        'border border-separate sticky z-20 top-0 text-g-primary-500   h-12 bg-white shadow-g-table-hr  border-gray-200 ',
                      headerTh:
                        'truncate text-body-3-bold text-dark    px-4  align-middle sticky top-0  h-full  ',
                      bodyTr: 'h-12',
                      bodyTd:
                        ' truncate text-body-3 text-dark border-b  px-4 py-2  align-middle ',
                    }}
                    expandedRow={expandedRow}
                    setExpandedRow={handleExpandRow}
                    expandColumn={expandColumn}
                    renderSubComponent={subComponent}
                    numberOfRows={numberOfRows}
                    isLoading={isLoading}
                    emptyStateMessage={emptyStateMessage}
                  />
                </div>
                {columnPinning?.right && (
                  <div className="sticky right-0 z-10 h-full bg-white ">
                    <Grid
                      table={table}
                      dataSource={visibleData}
                      placement="Right"
                      className={{
                        table: 'table-auto min-w-full ',
                        headerTr:
                          ' sticky top-0  text-g-primary-500  h-12  bg-white shadow-g-table-hr border border-transparent   ',
                        headerTh:
                          'truncate text-body-3-bold text-dark    px-4  align-middle sticky top-0  h-full  ',
                        bodyTr: 'h-12',
                        bodyTd:
                          ' truncate text-body-3 text-dark border-b   px-4 py-2  align-middle ',
                      }}
                      numberOfRows={numberOfRows}
                      isLoading={isLoading}
                      emptyStateMessage={emptyStateMessage}
                    />
                  </div>
                )}
              </>
            </div>
          </div>
        )}
        <Pagination table={table} />
      </div>
    </div>
  );
}
