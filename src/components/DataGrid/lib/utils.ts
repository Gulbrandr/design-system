import {
  FilterFn,
  FilterMeta,
  flexRender,
  SortingFn,
  sortingFns,
} from '@tanstack/react-table';
import ReactDOMServer from 'react-dom/server';
import { Table } from '@tanstack/react-table';
import { ReactElement, JSXElementConstructor } from 'react';
import { rankItem, compareItems } from '@tanstack/match-sorter-utils';

type FilterMetaWItemRank = FilterMeta & {
  itemRank: number;
};

export const downloadBlob = (
  blob: Blob | MediaSource,
  fileName = 'grid-data.csv'
) => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.position = 'absolute';
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

type ExportCsvOptions<T> = {
  reportName?: string;
  table: Table<T>;
  rawDataSource: T[];
  csvExportType: 'raw' | 'formatted';
};

export function exportCSV<T>({
  table,
  reportName,
  csvExportType = 'formatted',
  rawDataSource,
}: ExportCsvOptions<T>) {
  let header: string[][] = [];
  let rows: string[][] = [];

  if (csvExportType === 'formatted') {
    header = table.getHeaderGroups().map((headerGroup) => {
      return headerGroup.headers.map((header) => {
        const headerContext = header.getContext();
        return headerContext.header.id;
      });
    });
    // this renders the table to a string, and converts it to a CSV
    rows = table.getRowModel().rows.map((row) =>
      row.getVisibleCells().map((cell) => {
        const rendered = ReactDOMServer.renderToStaticMarkup(
          flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ) as ReactElement<any, string | JSXElementConstructor<any>>
        );
        return rendered.replace(/<[^>]*>?/gm, '');
      })
    );
  }

  if (csvExportType === 'raw') {
    header = [Object.keys(rawDataSource[0] as object)];
    rows = rawDataSource.map((row) => {
      return Object.values(row as object).map((value) => {
        if (value === null) return '';
        return String(value).replace(/,/g, ' ');
      });
    });
  }

  const contents = [header].concat(rows).join('\n');
  const blob = new Blob([contents], { type: 'text/csv;charset=utf-8;' });

  downloadBlob(blob, `${reportName}.csv`);
}

export function isNumber(value: unknown): value is number {
  const parseNumber = Number(value);
  return !isNaN(parseNumber) && typeof parseNumber === 'number';
}
