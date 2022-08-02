import { Avatar, Grid, Skeleton, TableCell, TableRow } from "@mui/material";

const Cells = () => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Grid item lg={2}>
            <Skeleton variant="circular" width={40} height={40}>
              <Avatar />
            </Skeleton>
          </Grid>
          <Grid item lg={10}>
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
    </TableRow>
  );
};

const TableSkeleton = () => {
  const rows = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  return (
    <>
      {rows.map((item) => (
        <Cells key={item.id} />
      ))}
    </>
  );
};

export default TableSkeleton;
