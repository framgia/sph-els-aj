import {
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { TableContainer, TableHeaderCell } from "./Styles";
import TableSkeleton from "./TableSkeleton";
import { HeadCells } from "./TableHeaders";
import { useAuth } from "../../../../hooks/auth";

/* TODO: Please ignore the static data for now. 
  Will be fetching the actual data from the API in the next task
*/
function createData(name, email, dateRegistered) {
  return { name, email, dateRegistered };
}

const rows = [
  createData("Name 1", "name1@gmail.com", "August 1, 2022"),
  createData("Name 2", "name2@gmail.com", "August 1, 2022"),
  createData("Name 3", "name3@gmail.com", "August 1, 2022"),
  createData("Name 4", "name4@gmail.com", "August 1, 2022"),
  createData("Name 5", "name5@gmail.com", "August 1, 2022"),
];

export default function UserTable() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {HeadCells.map((cell) => (
                <TableHeaderCell key={cell.text}>{cell.text}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!user ? (
              <TableSkeleton />
            ) : (
              rows.map((row, index) => (
                <TableRow hover key={row.name}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    <Grid
                      container
                      sx={{ display: "flex", alignItems: "center" }}
                      spacing={2}
                    >
                      <Grid item lg={2}>
                        <Avatar alt={row.name} src="." />
                      </Grid>
                      <Grid item lg={10}>
                        <Typography>{row.name}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.dateRegistered}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
