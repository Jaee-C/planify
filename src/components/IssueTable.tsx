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
import type {UIIssue} from '@/interfaces';
import {QueryClient, useMutation, useQuery, useQueryClient} from 'react-query';
import {fetchIssueList} from '@/components/data/issues';

export default function IssueTable() {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [editingRow, setEditingRow] = React.useState<UIIssue | undefined>(
    undefined
  );
  const {data, isLoading} = useQuery<UIIssue[]>('issues', fetchIssueList);
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const queryClient: QueryClient = useQueryClient();

  React.useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      const newRows: GridRowsProp = data.map(row => {
        return {
          id: row.id,
          key: `${row.project}-${row.id}`,
          title: row.title,
          assignee: row.assignee,
          status: row.status,
          priority: 'low',
        };
      });
      setRows(newRows);
    }
  }, [data]);

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
      if (!data) {
        return;
      }

      const row = data.find(row => row.id === id);
      setEditingRow(row);
      setDialogOpen(true);
    },
    [data]
  );

  const deleteIssue = useMutation((id: GridRowId) => {
    return fetch(`/api/issue/${id}`, {
      method: 'DELETE',
    });
  });

  const handleDelete = (id: GridRowId) => {
    deleteIssue.mutate(id);
    queryClient.invalidateQueries('issues');
    setRows(rows.filter(row => row.id !== id));
  };

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
      align: 'left',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      editable: true,
      align: 'left',
      width: 125,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      editable: true,
      width: 75,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          label="Delete"
          icon={<MdDelete />}
          onClick={() => handleDelete(params.id)}
        />,
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
