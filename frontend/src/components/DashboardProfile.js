import { Avatar, Grid, Typography } from "@mui/material";

const ProfileSection = ({ user, children }) => {
  const {
    avatar: { url },
  } = user;

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ maxHeight: 150 }}
    >
      <Typography sx={{ mr: 14 }} variant="h6">
        Dashboard
      </Typography>
      <Grid container alignItems="center" justifyContent="center" mt={1}>
        <Grid item mr={1}>
          <Avatar
            src={url}
            sx={{
              height: 80,
              width: 80,
            }}
            variant="rounded"
          />
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileSection;
