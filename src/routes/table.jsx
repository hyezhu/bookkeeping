import * as React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function RuleTable({ rows, deleteRow, editRow }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))} */}
              {/* <TableCell>Edit</TableCell> */}
              <TableCell id="name" style={{ minWidth: 70 }}>
                Rule
              </TableCell>
              <TableCell
                id="receiverAccount"
                align="right"
                style={{ minWidth: 30 }}
              >
                Receiver Account
              </TableCell>
              <TableCell
                id="senderAccount"
                align="right"
                style={{ minWidth: 30 }}
              >
                Sender Account
              </TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right" style={{ minWidth: 30 }}>
                      {row.receiverAccount}
                    </TableCell>
                    <TableCell align="right" style={{ minWidth: 30 }}>
                      {row.senderAccount}
                    </TableCell>

                    <TableCell key={`edit${row.id}`}>
                      <IconButton onClick={() => editRow(row.id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell key={`delete${row.id}`}>
                      <IconButton
                        onClick={() => {
                          deleteRow(row.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={Math.floor(rows.length / 10) + 1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
