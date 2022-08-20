import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { School, ChevronLeft } from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

import { MainListItems, SecondaryListItems } from "./ListItems";
import { useAuth } from "../../../hooks/auth";
import BackdropLoader from "../../../components/BackdropLoader";
import { useState } from "react";

const DRAWER_WIDTH = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const SideBarListItems = styled(ListItemButton)(({ path, location }) => ({
  background: location === path ? "#f4f4f4" : null,
}));

export default function SideBar({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth({ middleware: "auth" });
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    logout();
  };

  return (
    <Drawer variant="permanent" open={open}>
      <BackdropLoader loading={loading} />
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <School />
        </Avatar>
        <Typography sx={{ fontWeight: "bold" }}>E-Learning System</Typography>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {MainListItems.map((item) => (
          <SideBarListItems
            key={item.text}
            onClick={() => navigate(item.path, { state: { open: open } })}
            path={item.path}
            location={location?.pathname}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </SideBarListItems>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={() => handleClick()}>
          <ListItemIcon>{SecondaryListItems.icon}</ListItemIcon>
          <ListItemText primary={SecondaryListItems.text} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
