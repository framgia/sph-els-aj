import UserLayout from "./UserLayout/UserLayout";

import { TabTitle } from "../../utils/GeneralFunctions";
import { Typography } from "@mui/material";

const UserList = () => {
  TabTitle("E-Learning System | Users");

  /* TODO: Temporary content, will be implementing the actual content in
  another task*/

  return (
    <UserLayout>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
      >
        Users
      </Typography>
    </UserLayout>
  );
};

export default UserList;
