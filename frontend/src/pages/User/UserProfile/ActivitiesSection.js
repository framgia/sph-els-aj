import {
  Avatar,
  Box,
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
import { FilterListOff } from "@mui/icons-material";

const ActivitiesPaper = styled(MuiPaper)({
  justifyContent: "space-between",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "30px",
  paddingTop: "20px",
  paddingBottom: "10px",
});

const ActivitiesSection = ({ user }) => {
  const {
    name,
    avatar: { url },
    activityLogs,
  } = user;

  return (
    <Grid item xs={12} md={8}>
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
              {activityLogs.length === 0 ? (
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <FilterListOff />
                  </ListItemAvatar>
                  <ListItemText primary={"No activities"} />
                </ListItem>
              ) : (
                activityLogs.map(({ id, description, created_at }, index) => (
                  <Box component="div" key={id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={name} src={url} />
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
    </Grid>
  );
};

export default ActivitiesSection;
