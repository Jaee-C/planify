import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
} from '@mui/material';
import {MdDelete} from 'react-icons/md';
import {IconContext} from 'react-icons';
import {visuallyHidden} from '@mui/utils';
import {useQuery} from 'react-query';

import TableToolbar from '@/components/Table/TableToolbar';
import RoundButton from '@/components/utils/RoundButton';
import CreateIssueForm from '@/components/CreateIssueForm';
import type {Data} from '@/interfaces';

// Comparator for use in sorting the table rows
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

// Get the comparator based on the current order and column to sort by
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: {[key in Key]: number | string},
  b: {[key in Key]: number | string}
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Stable sort function that works in non-modern browsers
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  // Add an index to each element of the array to preserve its original position
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    // Compare the elements using the provided comparator function
    const order = comparator(a[0], b[0]);
    // If the order is not equal to 0, return it
    if (order !== 0) {
      return order;
    }
    // If the order is equal to 0, sort the elements based on their original position
    return a[1] - b[1];
  });
  // Return the sorted array without the added index
  return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  sortable: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'key',
    disablePadding: true,
    label: 'Key',
    sortable: true,
  },
  {
    id: 'title',
    disablePadding: false,
    label: 'Title',
    sortable: true,
  },
  {
    id: 'assignee',
    disablePadding: false,
    label: 'Assignee',
    sortable: true,
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status',
    sortable: true,
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler =
    (property: keyof Data, sortable: boolean) =>
    (event: React.MouseEvent<unknown>) => {
      if (sortable) {
        onRequestSort(event, property);
      }
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'key' ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id, headCell.sortable)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell size="small"></TableCell>
      </TableRow>
    </TableHead>
  );
}

async function fetchIssueList() {
  const response = await fetch('/api/issues', {method: 'GET'});
  if (!response.ok) {
    throw new Error('Failed to fetch issues');
  }
  return response.json();
}

export default function IssueTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('key');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingRow, setEditingRow] = React.useState<Data | undefined>(
    undefined
  );
  const {data: rows, isLoading} = useQuery<Data[]>('issues', fetchIssueList);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFormOpen = () => {
    setEditingRow(undefined);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditingRow(undefined);
    setDialogOpen(false);
  };

  const handleClick = (event: React.MouseEvent<unknown>, data: Data) => {
    // const selectedIndex = selected.indexOf(name);
    // let newSelected: readonly string[] = [];
    //
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    //
    // setSelected(newSelected);
    setEditingRow(data);
    setDialogOpen(true);

    console.log(`Selected entry ${name}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    rows !== undefined && page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - rows.length)
      : 0;

  return (
    <IconContext.Provider value={{size: '16px'}}>
      <Box sx={{width: '100%'}}>
        <Paper
          sx={{width: '100%', mb: 2}}
          className="bg-transparent shadow-none"
        >
          <TableToolbar openForm={handleFormOpen} />
          <TableContainer>
            <Table
              sx={{minWidth: 750}}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {!isLoading &&
                  rows !== undefined &&
                  stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: Data, index) => {
                      const labelId = `issue-table-entry-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={event => handleClick(event, row)}
                          role="button"
                          tabIndex={-1}
                          key={row.key}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                          >
                            {row.key}
                          </TableCell>
                          <TableCell align="left">{row.title}</TableCell>
                          <TableCell align="left">{row.assignee}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                          <TableCell align="center">
                            <RoundButton onClick={() => {}}>
                              <MdDelete className="inline" />
                            </RoundButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows?.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <CreateIssueForm
        formOpen={dialogOpen}
        closeForm={handleDialogClose}
        editingIssue={editingRow}
      />
    </IconContext.Provider>
  );
}
