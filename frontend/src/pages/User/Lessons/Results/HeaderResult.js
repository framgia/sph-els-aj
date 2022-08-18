import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const HeaderResult = ({ title, questions }) => {
  const [total, setTotal] = useState(0);
  const [countIsCorrect, setCountIsCorrect] = useState(0);

  useEffect(() => {
    if (questions) {
      setTotal(questions.length);
      const newCount = questions.reduce((accumulator, obj) => {
        if (obj.is_correct === 1) {
          return accumulator + 1;
        }
        return accumulator;
      }, 0);
      setCountIsCorrect(newCount);
    }
  }, [questions]);
  return (
    <>
      <Grid container display="flex" justifyContent="space-between">
        <Grid item>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </Grid>
        <Grid item alignItems="right">
          <Typography gutterBottom variant="h5" component="div">
            Result: {countIsCorrect}/{total}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={2}
      >
        <Grid item xs={9}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            align="center"
            sx={{ ml: "30%", noWrap: "break-word" }}
          >
            Question
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
            Answer
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default HeaderResult;
