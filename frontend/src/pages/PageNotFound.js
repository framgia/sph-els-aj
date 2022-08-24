import { Button, CssBaseline, styled, Typography } from "@mui/material";
import MuiBox from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { TabTitle } from "../utils/GeneralFunctions";

export const Box = styled(MuiBox)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
});

const Unauthorized = () => {
  TabTitle("Error | Page Not Found");

  const navigate = useNavigate();

  return (
    <Box>
      <CssBaseline />
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="h6">
        404 - We coudn't find this page.
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </Box>
  );
};

export default Unauthorized;
