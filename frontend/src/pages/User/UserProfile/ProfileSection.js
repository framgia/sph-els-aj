import { Avatar, Divider, Grid, styled, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import MuiPaper from "@mui/material/Paper";

import { useState } from "react";
import { useFollow } from "../../../hooks/User/follow";
import UserListDialog from "../../../components/UserListDialog";

const ProfilePaper = styled(MuiPaper)({
  flexDirection: "column",
  display: "flex",
  width: "100%",
  marginBottom: "30px",
  padding: "30px",
});

const useStyles = makeStyles(({ palette }) => ({
  textLink: {
    color: palette.primary.main,
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const ProfileSection = ({ user, mutate }) => {
  const [loading, setLoading] = useState(false);
  const { followUser, unfollowUser } = useFollow(setLoading, mutate);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const classes = useStyles();
  const {
    id,
    name,
    avatar: { url },
    following,
    followers,
    topicsLearned,
    is_followed,
  } = user;

  const handleClick = async (is_followed, id) => {
    setLoading(true);
    is_followed
      ? unfollowUser({ idToUnfollow: id })
      : followUser({ idToFollow: id });
  };

  return (
    <Grid container item xs={12} md={3}>
      <ProfilePaper sx={{ justifyContent: "center" }}>
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={url}
            sx={{
              height: 150,
              width: 150,
            }}
          />
        </Grid>
        <Grid item mt={2}>
          <Typography align="center" mb={2}>
            {name}
          </Typography>
          <Divider />
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            mt={1}
          >
            <Grid item sx={{ mr: "15%" }}>
              <Typography align="center">{following}</Typography>
              <Typography
                className={classes.textLink}
                onClick={() => setIsFollowingOpen(true)}
              >
                Following
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center">{followers}</Typography>
              <Typography
                className={classes.textLink}
                onClick={() => setIsFollowersOpen(true)}
              >
                Followers
              </Typography>
            </Grid>
          </Grid>
          <Grid container item display="flex" justifyContent="center">
            <LoadingButton
              variant="contained"
              loading={loading}
              sx={{ mt: 3 }}
              onClick={() => handleClick(is_followed, id)}
            >
              {is_followed ? "Unfollow" : "Follow"}
            </LoadingButton>
          </Grid>
          <Grid container justifyContent="center" mt={5}>
            Learned {topicsLearned} topic(s)
          </Grid>
        </Grid>
      </ProfilePaper>
      <UserListDialog
        title="List of Followed Users"
        url={`api/user/follow/get-following/${id}`}
        isOpen={isFollowingOpen}
        handleDialog={(value) => setIsFollowingOpen(value)}
      />
      <UserListDialog
        title="List of Followers"
        url={`api/user/follow/get-followers/${id}`}
        isOpen={isFollowersOpen}
        handleDialog={(value) => setIsFollowersOpen(value)}
      />
    </Grid>
  );
};

export default ProfileSection;
