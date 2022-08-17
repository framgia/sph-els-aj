import { CheckCircle, Dangerous } from "@mui/icons-material";
import { Grid, styled, Typography } from "@mui/material";
import MuiCard from "@mui/material/Card";

const IsCorrectIcon = ({ isCorrect }) => {
  return isCorrect ? (
    <CheckCircle sx={{ height: 80, width: 80, color: "green" }} />
  ) : (
    <Dangerous sx={{ height: 80, width: 80, color: "red" }} />
  );
};

const Card = styled(MuiCard)({
  height: "100%",
  justifyContent: "space-between",
  display: "flex",
  flexDirection: "row",
  marginBottom: "30px",
  padding: "30px",
});

const ResultList = ({ questions }) => {
  return (
    questions &&
    questions.map(({ question, answer, is_correct }, index) => (
      <Card key={index}>
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={2}
        >
          <Grid item xs>
            <IsCorrectIcon isCorrect={is_correct} />
          </Grid>
          <Grid item xs={6}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
              sx={{ noWrap: "break-word" }}
            >
              {question.value}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
              sx={{ noWrap: "break-word" }}
            >
              {answer.value}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    ))
  );
};

export default ResultList;
