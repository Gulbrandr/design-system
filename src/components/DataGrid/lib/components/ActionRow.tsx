import React, { Fragment } from 'react';

type ActionRowProps<T> = {
  actions?: Action<T>[];
  selectedRows: T[] | [];
};

export type Action<T> = {
  handler?: (rows: T[] | []) => void;
  name: string;
  plural?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ActionIcon: any & {
    muiName: string;
  };
};

type handler<T> = (rows: T[] | []) => void;

export default function ActionRow<T>({
  actions,
  selectedRows,
}: ActionRowProps<T>) {
  const handleActions = (handler: handler<T>, selectedRows: T[] | []) => {
    handler(selectedRows);
  };

  return (
    <div className="flex items-center h-full px-8  pt-2 pb-3 bg-gray-100 ">
      <div className="flex items-center flex-grow w-full h-full gap-6 pl-6 font-sans text-xs justify-end">
        {actions &&
          actions?.length > 0 &&
          actions.map(({ handler, name, ActionIcon }, index) => (
            <Fragment key={index}>
              <button
                aria-label="Action Button"
                className="flex gap-1 pt-1 align-middle hover:underline text-secondary-600 disabled:opacity-40 disabled:no-underline"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!handler) return;
                  handleActions(handler, selectedRows);
                }}
                disabled={selectedRows.length === 0}
              >
                <ActionIcon
                  sx={{
                    fontSize: 20,
                    stroke: 'var(--secondary-300)',
                    fill: 'var(--secondary-600)',
                  }}
                />
                <div className="flex items-center h-full pt-[1.4px]">
                  {name}
                </div>
              </button>
            </Fragment>
          ))}
      </div>
    </div>
  );
}
