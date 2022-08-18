import { Box, CircularProgress, Container, Grid, styled } from "@mui/material";
import { useParams } from "react-router-dom";

import UserLayout from "../UserLayout/UserLayout";
import ProfileSection from "./ProfileSection";
import ActivitiesSection from "./ActivitiesSection";
import { TabTitle } from "../../../utils/GeneralFunctions";
import { useProfile } from "../../../hooks/User/profile";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "50vh",
});

const UserProfile = () => {
  const { id } = useParams();
  const { user, mutate, isLoading } = useProfile(id);

  TabTitle("E-Learning System | Profile");

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
              <ProfileSection user={user} mutate={mutate} />
              <ActivitiesSection user={user} />
            </>
          )}
        </Grid>
      </Container>
    </UserLayout>
  );
};

export default UserProfile;
