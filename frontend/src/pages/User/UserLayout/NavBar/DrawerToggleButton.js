import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const DrawerToggleButton = ({ handleDrawerToggle }) => {
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: "none" } }}
    >
      <Menu />
    </IconButton>
  );
};

export default DrawerToggleButton;
