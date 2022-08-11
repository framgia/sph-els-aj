import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { navItems } from "./NavItems";
const NavBarItems = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      {navItems.map(({ text, path }) => (
        <Button
          key={text}
          sx={{ color: "#fff" }}
          onClick={() => navigate(path)}
        >
          {text}
        </Button>
      ))}
    </Box>
  );
};

export default NavBarItems;
