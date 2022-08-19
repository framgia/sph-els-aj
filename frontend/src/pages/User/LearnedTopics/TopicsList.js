import { FilterListOff } from "@mui/icons-material";
import {
  Box,
  Chip,
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

import { useTopics } from "../../../hooks/User/topics";
import { TopicsPaper, useStyles } from "./Styles";
import { IsCorrectIcon, CorrectAnswerChip } from "./TopicsChips";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "50vh",
});

const TopicsList = () => {
  const { topics, isLoading } = useTopics();
  const { lessons } = topics || {};
  const classes = useStyles();

  return (
    <TopicsPaper elevation={1}>
      <Grid item>
        <Typography mb={1} ml={2} variant="h5">
          Learned Topics
        </Typography>
        <Divider />
      </Grid>
      <Grid item>
        <Box className={classes.boxTopicsList} component="div">
          {isLoading ? (
            <LoaderBox>
              <CircularProgress />
            </LoaderBox>
          ) : (
            <List sx={{ width: "100%" }}>
              {!lessons.length ? (
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <FilterListOff />
                  </ListItemAvatar>
                  <ListItemText primary={"No activities"} />
                </ListItem>
              ) : (
                lessons.map(
                  (
                    {
                      question: { value, correctAnswer },
                      option: { value: yourAnswer },
                      category: { title },
                    },
                    index
                  ) => (
                    <Box component="div" key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={`${index + 1}. ${value}`}
                          secondary={
                            <Box
                              component="span"
                              className={classes.secondaryListSpan}
                            >
                              <Typography
                                className={classes.yourAnswer}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Your answer:
                              </Typography>
                              <Typography
                                className={classes.answer}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {yourAnswer}
                              </Typography>
                              <IsCorrectIcon
                                correctAnswer={correctAnswer.value}
                                yourAnswer={yourAnswer}
                              />
                            </Box>
                          }
                        />
                        <CorrectAnswerChip
                          correctAnswer={correctAnswer.value}
                          yourAnswer={yourAnswer}
                        />
                        <Chip label={title} color="info" sx={{ mr: 1 }} />
                      </ListItem>
                      {index !== lessons.length - 1 && <Divider />}
                    </Box>
                  )
                )
              )}
            </List>
          )}
        </Box>
      </Grid>
    </TopicsPaper>
  );
};

export default TopicsList;
