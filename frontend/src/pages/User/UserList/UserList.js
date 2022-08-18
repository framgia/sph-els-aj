import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

import UserLayout from "../UserLayout/UserLayout";
import BackdropLoader from "../../../components/BackdropLoader";
import { TabTitle } from "../../../utils/GeneralFunctions";
import { useUserList } from "../../../hooks/User/users";
import { useFollow } from "../../../hooks/User/follow";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "75vh",
});

const UserList = () => {
  TabTitle("E-Learning System | Users");

  const [loading, setLoading] = useState(false);
  const { users, mutate } = useUserList();

  const { followUser, unfollowUser } = useFollow(setLoading, mutate);

  const handleClick = (is_followed, id) => {
    setLoading(true);
    is_followed
      ? unfollowUser({ idToUnfollow: id })
      : followUser({ idToFollow: id });
  };

  return (
    <UserLayout>
      <BackdropLoader loading={loading} />
      <Container maxWidth="md">
        <List sx={{ width: "100%" }}>
          {!users && (
            <LoaderBox>
              <CircularProgress />
            </LoaderBox>
          )}
          <Paper sx={{ bgcolor: "background.paper" }} elevation={1}>
            {users &&
              users.map(({ id, name, email, avatar, is_followed }) => (
                <Box component="div" key={id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <LoadingButton
                        variant="outlined"
                        onClick={() => handleClick(is_followed, id)}
                      >
                        {is_followed ? "Unfollow" : "Follow"}
                      </LoadingButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt={name} src={avatar.url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link
                          component={RouterLink}
                          to={`/users/profile/${id}`}
                          variant="body2"
                          sx={{ textDecoration: "none" }}
                        >
                          {name}
                        </Link>
                      }
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
                  <Divider />
                </Box>
              ))}
          </Paper>
        </List>
      </Container>
    </UserLayout>
  );
};

export default UserList;
