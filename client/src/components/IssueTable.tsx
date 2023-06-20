import * as React from 'react';
import {Box, Paper} from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import {MdDelete, MdEdit} from 'react-icons/md';
import {IconContext} from 'react-icons';

import TableToolbar from '@/components/Table/TableToolbar';
import IssueEditDialog from '@/components/IssueEditDialog';
import type {Data} from '@/interfaces';

const rows: GridRowsProp = [
  {
    id: 0,
    key: 'PRJ-1',
    title: 'Create PoC',
    assignee: 'Daniel',
    status: 'In Progress',
    priority: 'low',
  },
  {
    id: 1,
    key: 'IT-2',
    title: 'Raise Issues',
    assignee: 'Daniel',
    status: 'In Progress',
    priority: 'low',
  },
  {
    id: 2,
    key: 'IT-69',
    title: 'Update Progress on Issues',
    assignee: 'Daniel',
    status: 'In Progress',
    priority: 'low',
  },
];

const data: Data[] = [
  {
    key: 'PRJ-1',
    title: 'Create PoC',
    assignee: 'Daniel',
    status: 'In Progress',
  },
  {
    key: 'PRJ-2',
    title: 'Raise Issues',
    assignee: 'Daniel',
    status: 'In Progress',
  },
  {
    key: 'IT-69',
    title: 'Update Progress on Issues',
    assignee: 'Daniel',
    status: 'In Progress',
  },
];
async function fetchIssueList() {
  const response = await fetch('/api/issues', {method: 'GET'});
  if (!response.ok) {
    throw new Error('Failed to fetch issues');
  }
  return response.json();
}

export default function IssueTable() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingRow, setEditingRow] = React.useState<Data | undefined>(
    undefined
  );
  const handleFormOpen = () => {
    setEditingRow(undefined);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditingRow(undefined);
    setDialogOpen(false);
  };

  const handleEdit = React.useCallback(
    (id: GridRowId) => () => {
      const row = data[id];
      setEditingRow(row);
      setDialogOpen(true);
    },
    []
  );

  const columns: GridColDef[] = [
    {field: 'key', headerName: 'Key', width: 100},
    {
      field: 'title',
      headerName: 'Title',
      editable: true,
      align: 'left',
      flex: 1,
      minWidth: 125,
    },
    {
      field: 'assignee',
      headerName: 'Assignee',
      editable: true,
      align: 'left',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      editable: true,
      align: 'left',
      width: 150,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      editable: true,
      width: 100,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem label="Delete" icon={<MdDelete />} />,
        <GridActionsCellItem
          label="Edit"
          icon={<MdEdit />}
          onClick={handleEdit(params.id)}
        />,
      ],
    },
  ];

  return (
    <IconContext.Provider value={{size: '16px'}}>
      <Box sx={{width: '100%'}}>
        <Paper
          sx={{width: '100%', mb: 2}}
          className="bg-transparent shadow-none"
        >
          <TableToolbar openForm={handleFormOpen} />
          <DataGrid
            sx={{
              '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
              },
            }}
            columns={columns}
            rows={rows}
          />
        </Paper>
      </Box>
      <IssueEditDialog
        formOpen={dialogOpen}
        closeForm={handleDialogClose}
        editingIssue={editingRow}
      />
    </IconContext.Provider>
  );
}
