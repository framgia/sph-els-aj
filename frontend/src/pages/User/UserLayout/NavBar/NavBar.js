import { AppBar, Toolbar } from "@mui/material";
import { useState } from "react";

import MobileDrawer from "./MobileDrawer";
import DrawerToggleButton from "./DrawerToggleButton";
import NavBarItems from "./NavBarItems";
import UserNavItem from "./UserNavItem";
import AppNameNavItem from "./AppNameNavItem";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar component="nav" position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <DrawerToggleButton handleDrawerToggle={handleDrawerToggle} />
        <AppNameNavItem />
        <NavBarItems />
        <UserNavItem />
      </Toolbar>
      <MobileDrawer
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
    </AppBar>
  );
};

export default NavBar;
