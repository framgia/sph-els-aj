import { Box, Typography } from "@mui/material";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {`Copyright © ${new Date().getFullYear()} All rights reserved`}
    </Typography>
  );
};

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        E-Learning System developed by: Abdul Jalil Palala
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
