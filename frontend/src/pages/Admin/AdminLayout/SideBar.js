import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import { School, ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { MainListItems, SecondaryListItems } from "./ListItems";
import { useAuth } from "../../../hooks/auth";
import BackdropLoader from "../../../components/BackdropLoader";
import { useState } from "react";

const DRAWER_WIDTH = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    zIndex: theme.zIndex.drawer - 4,
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
      [theme.breakpoints.up("xs")]: {
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
  const { user, logout } = useAuth({ middleware: "auth" });
  const { name, type, avatar } = user || {};
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
        <Avatar sx={{ mr: 1, bgcolor: "primary.main" }}>
          <School />
        </Avatar>
        <Typography sx={{ fontWeight: "bold" }}>E-Learning System</Typography>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {!user ? (
          <ListItem>
            <ListItemIcon>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemIcon>
            <ListItemText
              primary={<Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
              secondary={
                <Skeleton
                  variant="text"
                  width="50%"
                  sx={{ fontSize: "1rem" }}
                />
              }
            />
          </ListItem>
        ) : (
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={name} src={avatar.url} />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={type.name} />
          </ListItem>
        )}
        <Divider />
        {MainListItems.map((item) => (
          <SideBarListItems
            key={item.text}
            onClick={() => navigate(item.path)}
            path={item.path}
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
