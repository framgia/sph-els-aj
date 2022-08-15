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
import { useState } from "react";

import UserLayout from "../UserLayout/UserLayout";
import { TabTitle } from "../../../utils/GeneralFunctions";
import { useUserList } from "../../../hooks/User/users";

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

  const { users } = useUserList();

  const [followButton, setFollowButton] = useState({
    text: "follow",
    variant: "outlined",
  });

  // TODO: Will be modifying this function in another task
  const toggle = ({ text }) => {
    if (text === "follow") {
      setFollowButton({ text: "unfollow", variant: "outlined" });
    } else {
      setFollowButton({ text: "follow", variant: "outlined" });
    }
  };

  return (
    <UserLayout>
      <Container maxWidth="md">
        <List sx={{ width: "100%" }}>
          {!users && (
            <LoaderBox>
              <CircularProgress />
            </LoaderBox>
          )}
          <Paper sx={{ bgcolor: "background.paper" }} elevation={1}>
            {users &&
              users.map(({ id, name, email, avatar }) => (
                <Box component="div" key={id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <LoadingButton
                        variant={followButton.variant}
                        onClick={() => toggle(followButton)}
                      >
                        {followButton.text}
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
