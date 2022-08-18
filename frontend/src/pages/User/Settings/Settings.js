import { Box, CircularProgress, Container, Grid, styled } from "@mui/material";

import UserLayout from "../UserLayout/UserLayout";
import { TabTitle } from "../../../utils/GeneralFunctions";
import { useAuth } from "../../../hooks/auth";
import ProfileSection from "./ProfileSection";
import BasicDetails from "./BasicDetails";
import Security from "./Security";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "50vh",
});

const Settings = () => {
  const { user, isLoading } = useAuth();

  TabTitle("E-Learning System | Edit Profile");

  return (
    <UserLayout>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          {isLoading ? (
            <LoaderBox>
              <CircularProgress />
            </LoaderBox>
          ) : (
            <>
              <Grid item xs={12} md={3}>
                <ProfileSection user={user} />
              </Grid>
              <Grid item xs={12} md={8}>
                <BasicDetails user={user} />
                <Security />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </UserLayout>
  );
};

export default Settings;
