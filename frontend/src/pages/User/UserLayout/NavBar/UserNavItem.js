import {
  Avatar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../../../../hooks/auth";
import BackdropLoader from "../../../../components/BackdropLoader";

const settings = [
  { text: "Dashboard", path: "/dashboard" },
  { text: "Profile", path: "/profile" },
  { text: "Settings", path: "/settings" },
];

const UserNavItem = () => {
  const { user, logout } = useAuth({ middleware: "auth" });
  const [loading, setLoading] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    setLoading(true);
    handleCloseUserMenu();
    logout();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <BackdropLoader loading={loading} />
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
        {settings.map(({ text, path }) => (
          <MenuItem key={text}>
            <Link
              component={RouterLink}
              to={path}
              variant="body2"
              sx={{ textDecoration: "none" }}
            >
              {text}
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={() => handleLogoutClick()}>
          <Typography textAlign="center" color="#1976d2" fontSize="0.875rem">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserNavItem;
