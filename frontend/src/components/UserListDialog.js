import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { FilterListOff } from "@mui/icons-material";

import ListDialog from "./ListDialog";
import { useFollowingAndFollower } from "../hooks/User/followingAndFollower";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "50vh",
});

const UserListDialog = ({ title, url, isOpen, handleDialog }) => {
  const { data, isLoading } = useFollowingAndFollower(url);
  const { users } = data || {};

  return (
    <ListDialog title={title} isOpen={isOpen} handleDialog={handleDialog}>
      {isLoading ? (
        <LoaderBox>
          <CircularProgress />
        </LoaderBox>
      ) : !users.length ? (
        <ListItem>
          <ListItemAvatar>
            <FilterListOff />
          </ListItemAvatar>
          <ListItemText primary={"Nothing to Display"} />
        </ListItem>
      ) : (
        <List sx={{ pt: 0 }}>
          {users.map(({ id, name, email, avatar: { url } }) => (
            <ListItem key={id}>
              <ListItemAvatar>
                <Avatar src={url} alt={name} />
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {email}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </ListDialog>
  );
};

export default UserListDialog;
