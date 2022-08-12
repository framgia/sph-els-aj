import { School } from "@mui/icons-material";
import { Typography } from "@mui/material";

const AppNameNavItem = () => {
  return (
    <>
      <School sx={{ mr: 2, display: { xs: "none", sm: "block" } }} />
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        E-Learning System
      </Typography>
    </>
  );
};

export default AppNameNavItem;
