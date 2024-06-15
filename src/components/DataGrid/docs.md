## Docs

[TanStack Table Docs](https://tanstack.com/table/v8/docs/guide/introduction)

### Dependencies

- `@tanstack/react-table`

### Props

- `tableName?`: string;
- `columns`: ColumnDef[]; - creates columns.
- `dataSource`: object[]; - data to be displayed -`exportToCSV?`: boolean; - turns on exports to csv button
- `simpleSearch?`: boolean; - turns on simple search functionality
- `simpleSearchPlaceholder?`: string;
- `checkboxColumn?`: boolean;
- `actions?`: Action[];

### When do I use

The standard &lt;table&gt; element or prebuilt library &lt;Table&gt; components should be used for displaying data that needs minimal interaction, or that doesn't need: `filtering or sorting`

The &lt;DataGrid&gt; component is designed for use-cases that are focused on handling large amounts of tabular data. While it comes with a more rigid structure, in exchange, you gain more powerful features.

### Features

#### Simple Search

Allows users to search all visible columns in the DataGrid.

#### Fuse Dependencies

- `fuse.js`: this allows us to search all columns using a weighted search, similar to elastic search.

#### Fuse Props

- `simpleSearch`: turns on simple search on the data grid.
- `simpleSearchPlaceholder`: changes the placeholder of the data grid, and fully replaces default.
- `columns w/ accessorKey`: simple search will only search visible columns.
- `columns w/ id and size 0 and meta.searchable:true `: simple search will also search columns with `id`. This should only be used to allow searching of combined columns.

```js
{
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }: { row: Row<UserGroupResponseClean> }) => (  // combined column.
    <div className="capitalize">
        {row.original.name} {row.original.familyName}
    </div>
    ),
},
{
    id: 'familyName',  // non-visible searchable column.
    size: 0, // this hides the column.
    meta:{
        searchable:true // makes a column searchable or not searchable.
        manageable:false // removes from column manager
    }
}
```

##### DataGridColumnMenu

(optional) Encapsulates Transition and Headless UI Dropdown Menu in a styled Menu.

###### Data Grid Dependencies

- `headlessui` for both `Transition` and `Menu` controls

###### Data Grid Props

- `menuItem`: Array of Items to in the menu, along with its handlers.

```js
<DataGridColumnMenu
  menuItems={[
    {
      name: 'Add Funds',
      Icon: AddCircleOutline,
      handler: () => {},
    },
    {
      name: 'Edit Profile',
      Icon: AccountCircleOutlinedIcon,
      handler: () => {
        setEditingUser(row.original);
        setShowEditUserModal(true);
      },
    },
  ]}
/>
```

#### Manage Columns

Columns Can be Shown/Hidden by the user, the developer though can tag columns, so that that the user has a better understanding of the columns data. The developer can prehide columns so not to overwhelm users of the Datagrid.

```js
const columns: ColumnDef<Person, unknown>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
    size: 200,
    meta: {
      tag: 'Name',
    },
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    size: 200,
    meta: {
      tag: 'Name',
    },
  },
  {
    header: 'Middle Name',
    accessorKey: 'middleName',
    size: 200,
    meta: {
      tag: 'Name', // organizes columns in the manage column menu.
      hidden: true, // pre hides columns.
    },
  },
  ...
];
```

## Filter Columns

### Filter Object

```js

```
