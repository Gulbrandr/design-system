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
import DataGridComponent from './lib';

import { exportCSV } from './lib/utils';

import { Action } from './lib/components/ActionRow';
import ColumnManager from './lib/components/ColumnManager';
import { HiPlus } from 'react-icons/hi2';

export { formatCurrency, formatDate, formatEIN } from './lib/formatters';
export { default as DataGridColumnMenu } from './lib/components/ui/ColumnMenu';

import Grid from './lib/components/Grid';
import Pagination from './lib/components/Pagination';
import ColumnFilters from './lib/components/Filters/ColumnFilters';
import SearchInput from './lib/components/Filters/GlobalFilter';
import useErrorBoundary from 'use-error-boundary';
import { Datum } from './lib/types';

type DataGridRecord = Record<string, unknown>;

type DataGridProps<T> = {
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

export default function DataGrid<T extends Datum>(props: DataGridProps<T>) {
  const { ErrorBoundary } = useErrorBoundary();
  return (
    <ErrorBoundary
      render={() => <DataGridComponent {...props} />}
      renderError={({ error }) => (
        <>
          <h1>Something went wrong</h1>
          <pre>{error.message}</pre>
        </>
      )}
    />
  );
}
