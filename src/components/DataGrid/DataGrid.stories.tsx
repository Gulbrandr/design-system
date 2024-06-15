import type { Meta, Story } from '@storybook/react';
import { CellContext, ColumnDef, Row } from '@tanstack/react-table';
import DataGrid, { formatDate } from '.';
import { ThemeProvider } from '@/hooks/useTheme';
import docs from './docs.md';

import useService from '@/hooks/useService';

const meta: Meta = {
  title: 'Display/DataGrid',
  component: DataGrid,
  parameters: {
    docs: {
      description: {
        component: docs,
      },
    },
  },
  args: {
    simpleSearch: true,
    tableName: 'Users Table',
    exportToCSV: true,
    csvExportType: 'raw',
    callToActionText: 'Call to Action',
    callToActionOnClick: () => {},
    expandColumn: true,
  },
  argTypes: {
    callToActionText: {
      label: 'Call to Action Button Text',
      name: 'callToActionButtonText',
      description: 'Text for the call to action button',
      control: { type: 'text' },
    },
    callToActionOnClick: {
      label: 'Call to Action Button On Click',
      name: 'callToActionButtonOnClick',
      description: 'On click handler for the call to action button',
      control: { type: 'function' },
    },
    simpleSearch: {
      label: 'Simple Search',
      name: 'Simple Search',
      description: 'Enable simple search',
      control: { type: 'boolean', labels: ['true', 'false'] },
    },
    simpleSearchPlaceholder: {
      label: 'Simple Search Placeholder',
      name: 'simpleSearchPlaceholder',
      description: 'Placeholder text for the search input',
      control: { type: 'text' },
    },
    tableName: {
      label: 'Table Name',
      name: 'tableName',
      description: 'Name of the table',
      control: { type: 'text', defaultValue: 'UsersTable' },
    },
    exportToCSV: {
      label: 'Export to CSV',
      name: 'exportToCSV',
      description: 'Enable export to CSV',
      control: { type: 'boolean' },
    },
    csvExportType: {
      label: 'CSV Export Type',
      name: 'csvExportType',
      description:
        'Whether to use the Table Rendered Data or Raw Data in CSV Export',
      control: { type: 'select', labels: ['formatted', 'raw'] },
    },
    expandColumn: {
      label: 'Expand Column',
      name: 'expandColumn',
      description: 'Enable expand column',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

const SubComponent = ({ row }: { row?: Row<Person> }) => {
  return (
    <div className="flex flex-col w-40 gap-2">
      <h3>Sub Component</h3>
      <p>Row: {JSON.stringify(row)}</p>
    </div>
  );
};

const Template: Story<Meta> = (args) => {
  const people = useService('people');
  const columns: ColumnDef<Person, unknown>[] = [
    {
      header: 'Full Name',
      accessorKey: 'firstName',
      size: 150,
      meta: {
        locked: true,
        filterLabel: 'First Name',
      },
      cell: ({ row }: CellContext<Person, unknown>) => {
        return (
          <div className="flex gap-2 item-center">
            {row.original.firstName} {row.original.lastName}
          </div>
        );
      },
    },
    {
      id: 'lastName',
      size: 0,
      meta: {
        searchable: true,
        filterLabel: 'Last Name',
      },
    },
    {
      header: 'Middle Name',
      accessorKey: 'middleName',
      size: 200,
      meta: {},
    },
    {
      header: 'Birthday',
      accessorKey: 'birthday',
      size: 200,
      meta: {
        filterType: 'date',
      },
      cell: ({ row }: CellContext<Person, unknown>) => {
        return <div>{formatDate(row.original.birthday)}</div>;
      },
    },
    {
      header: 'Bank Balance',
      accessorKey: 'bankBalance',
    },
    {
      header: 'Email',
      accessorKey: 'email',
      size: 200,
      meta: {
        tag: 'Contact',
        hidden: true,
      },
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
      size: 200,
      meta: {
        tag: 'Contact',
        hidden: true,
      },
    },
    {
      header: 'Age',
      accessorKey: 'age',
      size: 200,
      meta: {
        filterType: 'number',
      },
    },
    {
      header: 'Visits',
      accessorKey: 'visits',
      size: 200,
      meta: {
        tag: 'Analytics',
        hidden: true,
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      size: 200,
    },
    {
      header: 'Profile Progress',
      accessorKey: 'progress',
      size: 200,
      meta: {
        tag: 'Analytics',
        hidden: true,
      },
    },
  ];

  return (
    <ThemeProvider>
      <div className="flex flex-col gap-2">
        <DataGrid
          {...args}
          dataSource={people.data as Data}
          columns={columns}
          subComponent={SubComponent}
          isLoading={people.loading}
        />
      </div>
    </ThemeProvider>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  ...meta.args,
};
