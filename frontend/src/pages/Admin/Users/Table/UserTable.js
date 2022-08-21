import { Avatar, Grid, Typography } from "@mui/material";
import MaterialTable from "material-table";
import moment from "moment";

import { tableIcons } from "../../../../utils/TableIcons";
import { useUserList } from "../../../../hooks/users";
import { TabTitle } from "../../../../utils/GeneralFunctions";

const UserTable = () => {
  TabTitle("E-Learning System | User List");

  const { users, isValidating } = useUserList();
  const columns = [
    {
      title: "Name",
      field: "name",
      render: ({ name, avatar: { url } }) => (
        <Grid
          container
          sx={{ display: "flex", alignItems: "center" }}
          spacing={2}
        >
          <Grid item lg={2}>
            <Avatar alt={name} src={url} />
          </Grid>
          <Grid item lg={10}>
            <Typography>{name}</Typography>
          </Grid>
        </Grid>
      ),
    },
    { title: "Email", field: "email" },
    {
      title: "Date Registered",
      field: "created_at",
      render: (rowData) => (
        <Typography>
          {moment(rowData.created_at).format("MMMM Do YYYY")}
        </Typography>
      ),
    },
  ];

  return (
    <MaterialTable
      icons={tableIcons}
      title="User List Table"
      columns={columns}
      data={users}
      isLoading={isValidating}
    />
  );
};

export default UserTable;
