import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

import NavBar from "./NavBar/NavBar";
import Footer from "./Footer";

const theme = createTheme();

const UserLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 3,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default UserLayout;
