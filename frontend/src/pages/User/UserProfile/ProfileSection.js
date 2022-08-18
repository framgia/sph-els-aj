import { Avatar, Divider, Grid, styled, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MuiPaper from "@mui/material/Paper";

import { useState } from "react";
import { useFollow } from "../../../hooks/User/follow";

const ProfilePaper = styled(MuiPaper)({
  flexDirection: "column",
  display: "flex",
  width: "100%",
  marginBottom: "30px",
  padding: "30px",
});

const ProfileSection = ({ user, mutate }) => {
  const [loading, setLoading] = useState(false);
  const { followUser, unfollowUser } = useFollow(setLoading, mutate);
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
              <Typography align="center">Following</Typography>
            </Grid>
            <Grid item>
              <Typography align="center">{followers}</Typography>
              <Typography align="center">Followers</Typography>
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
    </Grid>
  );
};

export default ProfileSection;
