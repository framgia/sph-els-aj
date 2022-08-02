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
import moment from "moment";

import { TableContainer, TableHeaderCell } from "./Styles";
import TableSkeleton from "./TableSkeleton";
import { HeadCells } from "./TableHeaders";
import { useUserList } from "../../../../hooks/users";

export default function UserTable() {
  const { users } = useUserList();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(parseInt(event.target.value, 10));
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
            {!users ? (
              <TableSkeleton />
            ) : (
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow hover key={user.name}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      <Grid
                        container
                        sx={{ display: "flex", alignItems: "center" }}
                        spacing={2}
                      >
                        <Grid item lg={2}>
                          <Avatar alt={user.name} src={user.avatar.url} />
                        </Grid>
                        <Grid item lg={10}>
                          <Typography>{user.name}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {moment(user.created_at).format("MMMM Do YYYY")}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={!users ? 0 : users?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
