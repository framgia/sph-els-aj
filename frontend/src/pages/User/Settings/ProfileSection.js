import { Avatar, Box, Grid, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import useAvatar from "../../../hooks/User/avatar";

const ProfilePaper = styled(Box)({
  flexDirection: "column",
  display: "flex",
  width: "100%",
  marginBottom: "30px",
  padding: "30px",
});

const ProfileSection = ({ user }) => {
  const {
    avatar: { url },
  } = user;
  const { handleAvatar, loading, setLoading } = useAvatar();

  const handleChange = (event) => {
    setLoading(true);
    handleAvatar(event);
  };

  return (
    <ProfilePaper sx={{ justifyContent: "flex-start" }}>
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
        <Grid container display="flex" justifyContent="center">
          <Grid item>
            <LoadingButton
              variant="contained"
              component="label"
              loading={loading}
            >
              Upload Photo
              <input
                hidden
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                onChange={(e) => handleChange(e)}
              />
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </ProfilePaper>
  );
};

export default ProfileSection;
