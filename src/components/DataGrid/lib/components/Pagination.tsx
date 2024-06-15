import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleRight,
  HiOutlineChevronDoubleLeft,
} from 'react-icons/hi2';

export default function Pagination<T>({ table }: { table: Table<T> }) {
  const [sliceLeft, setSliceLeft] = useState(0);
  const [sliceRight, setSliceRight] = useState(10);

  const handleSliceRight = (index: number) => {
    setSliceLeft(sliceLeft + 10);
    setSliceRight(sliceRight + 10);
    table.setPageIndex(sliceLeft + 10);
  };

  const handleSliceLeft = (index: number) => {
    setSliceLeft(sliceLeft - 10);
    setSliceRight(sliceRight - 10);
    table.setPageIndex(sliceRight - 1 - 10);
  };

  const handleFirstPage = () => {
    setSliceLeft(0);
    setSliceRight(10);
    table.setPageIndex(0);
  };

  const handleLastPage = () => {
    setSliceLeft(table.getPageCount() - 10);
    setSliceRight(table.getPageCount());
    table.setPageIndex(table.getPageCount() - 1);
  };

  return (
    <div className="flex items-center justify-center w-full h-full py-4 border-t border-dark-100 text-caption">
      {table.getPageCount() > 1 ? (
        <div className="flex items-center justify-center ">
          <button
            onClick={() => handleFirstPage()}
            disabled={!table.getCanPreviousPage()}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiOutlineChevronDoubleLeft className="text-lg min-w-fit" />
          </button>
          <button
            onClick={() =>
              handleSliceLeft(table.getState().pagination.pageIndex)
            }
            disabled={table.getState().pagination.pageIndex - 10 < 0}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronLeft className="text-lg min-w-fit" />
          </button>

          <div className="flex rounded bg-fenrir-50">
            {[
              ...Array(
                Math.round(
                  table.getCoreRowModel().rows.length /
                    table.getState().pagination.pageSize
                )
              ),
            ]
              .slice(sliceLeft, sliceRight)
              .map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-6 py-1 text-xs text-gray-700   ${
                    table.getState().pagination.pageIndex + 1 ===
                      index + 1 + sliceLeft &&
                    'bg-g-primary-500  rounded-full text-light'
                  }`}
                  onClick={() => table.setPageIndex(index + sliceLeft)}
                  value={index}
                >
                  {index + 1 + sliceLeft}
                </button>
              ))}
          </div>
          <button
            onClick={() =>
              handleSliceRight(table.getState().pagination.pageIndex)
            }
            disabled={
              table.getState().pagination.pageIndex + 1 + 10 >
              table.getPageCount()
            }
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronRight className="text-lg min-w-fit" />
          </button>
          <button
            onClick={() => handleLastPage()}
            disabled={true}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronDoubleRight className="text-lg min-w-fit" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center ">
          <button
            onClick={() => handleFirstPage()}
            disabled={true}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiOutlineChevronDoubleLeft className="text-lg min-w-fit" />
          </button>
          <button
            onClick={() =>
              handleSliceLeft(table.getState().pagination.pageIndex)
            }
            disabled={table.getState().pagination.pageIndex - 10 < 0}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronLeft className="text-lg min-w-fit" />
          </button>

          <div className="flex justify-center w-6 py-1 text-xs rounded-full bg-primary-500 text-light">
            1
          </div>
          <button
            onClick={() =>
              handleSliceRight(table.getState().pagination.pageIndex)
            }
            disabled={true}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronRight className="text-lg min-w-fit" />
          </button>
          <button
            onClick={() => handleLastPage()}
            disabled={true}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronDoubleRight className="text-lg min-w-fit" />
          </button>
        </div>
      )}
    </div>
  );
}
