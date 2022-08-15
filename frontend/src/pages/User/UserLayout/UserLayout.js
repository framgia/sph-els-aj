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
        <Box sx={{ py: 8, bgcolor: "background.paper", pt: 3, pb: 6 }}>
          {children}
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default UserLayout;
