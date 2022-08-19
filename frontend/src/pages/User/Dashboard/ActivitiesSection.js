import { FilterListOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import MuiPaper from "@mui/material/Paper";

import { useActivityLogs } from "../../../hooks/User/activityLogs";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "50vh",
});

const ActivitiesPaper = styled(MuiPaper)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  paddingTop: "20px",
  paddingBottom: "10px",
});

const ActivitiesSection = () => {
  const { activityLogs, isLoading } = useActivityLogs();

  return (
    <ActivitiesPaper elevation={1}>
      <Grid item>
        <Typography mb={1} ml={2} variant="h5">
          Activities
        </Typography>
        <Divider />
      </Grid>
      <Grid item>
        <Box
          sx={{ height: 400, maxHeight: 400, overflow: "auto" }}
          component="div"
        >
          <List sx={{ width: "100%" }}>
            {isLoading ? (
              <LoaderBox>
                <CircularProgress />
              </LoaderBox>
            ) : !activityLogs.length ? (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <FilterListOff />
                </ListItemAvatar>
                <ListItemText primary={"No activities"} />
              </ListItem>
            ) : (
              activityLogs.map(({ avatar, description, created_at }, index) => (
                <Box component="div" key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={description}
                      secondary={
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {created_at}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index !== activityLogs.length - 1 && <Divider />}
                </Box>
              ))
            )}
          </List>
        </Box>
      </Grid>
    </ActivitiesPaper>
  );
};

export default ActivitiesSection;
