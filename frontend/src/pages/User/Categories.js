import UserLayout from "./UserLayout/UserLayout";

import { TabTitle } from "../../utils/GeneralFunctions";
import { Typography } from "@mui/material";

const Categories = () => {
  TabTitle("E-Learning System | Categories");

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
        Categories
      </Typography>
    </UserLayout>
  );
};

export default Categories;
