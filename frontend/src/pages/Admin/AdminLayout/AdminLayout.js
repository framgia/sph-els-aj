import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, CssBaseline, Grid, Toolbar } from "@mui/material";
import createPersistedState from "use-persisted-state";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import useWindowSize from "../../../hooks/windowSize";

const useDrawerState = createPersistedState("drawerState");

const mdTheme = createTheme();

const Layout = ({ children, navTitle }) => {
  const location = useLocation();
  const [open, setOpen] = useDrawerState(location?.state?.open);
  useWindowSize(setOpen);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar navTitle={navTitle} open={open} toggleDrawer={toggleDrawer} />
        <SideBar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {children}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const AdminLayout = ({ children, navTitle }) => {
  return <Layout navTitle={navTitle}>{children}</Layout>;
};

export default AdminLayout;
