import {
  Box,
  CircularProgress,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";

import UserLayout from "../UserLayout/UserLayout";
import DashboardProfile from "../../../components/DashboardProfile";
import TopicsList from "./TopicsList";
import { TabTitle } from "../../../utils/GeneralFunctions";
import { useAuth } from "../../../hooks/auth";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "50vh",
});

const LearnedTopics = () => {
  const { user, isLoading } = useAuth();
  const { name, topicsLearned } = user || {};

  TabTitle("E-Learning System | Topics Learned");

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
              <Grid container item xs={12} md={4}>
                <DashboardProfile user={user}>
                  <Typography variant="subtitle2" component="div">
                    {name}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Learned {topicsLearned} topic(s)
                  </Typography>
                </DashboardProfile>
              </Grid>
              <Grid item xs={12} md={8} sx={{ flexGrow: 1 }}>
                <TopicsList />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </UserLayout>
  );
};

export default LearnedTopics;
