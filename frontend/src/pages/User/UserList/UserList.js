import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import UserLayout from "../UserLayout/UserLayout";
import { TabTitle } from "../../../utils/GeneralFunctions";
import { useUserList } from "../../../hooks/User/users";
import BackdropLoader from "../../../components/BackdropLoader";

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

  const { users, loading, setLoading, followUser, unfollowUser } =
    useUserList();

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
