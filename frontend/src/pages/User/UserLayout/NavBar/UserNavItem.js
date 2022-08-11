import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useAuth } from "../../../../hooks/auth";

const settings = [
  { text: "Dashboard", path: "/dashboard" },
  { text: "Profile", path: "/profile" },
  { text: "Settings", path: "/settings" },
];

const UserNavItem = () => {
  const { user, logout } = useAuth({ middleware: "auth" });

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {!user ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <Tooltip title={user?.name}>
          <IconButton onClick={handleOpenUserMenu} sx={{ pl: 1 }}>
            <Avatar alt={user?.name} src={user?.avatar?.url} />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(({ text }) => (
          <MenuItem key={text}>
            <Typography textAlign="center">{text}</Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={logout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserNavItem;
