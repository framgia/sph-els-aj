import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { useUserQuestions } from "../../../hooks/User/questions";
import { TabTitle } from "../../../utils/GeneralFunctions";
import UserLayout from "../UserLayout/UserLayout";
import Questions from "./Questions";
import BackdropLoader from "../../../components/BackdropLoader";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "50vh",
});

const Lesson = () => {
  const location = useLocation();
  const { state } = location;
  const { id, title } = state;
  const { questions, loading, setLoading, submitAnswer } = useUserQuestions(id);
  const [data, setData] = useState([]);

  TabTitle(`E-Learning | ${title} Lesson`);

  const handleChange = (
    event,
    { id, question_id, questionIndex, is_correct }
  ) => {
    const newState = data.map((item, index) => {
      if (index === questionIndex) {
        return {
          question_id: question_id,
          option_id: id,
          is_correct: is_correct,
        };
      }
      return item;
    });
    setData(newState);
  };

  useEffect(() => {
    if (questions) {
      const newState = questions.map(() => {
        return { question_id: null, option_id: null };
      });
      setData(newState);
    }
  }, [questions]);

  const onSubmit = () => {
    // Checks whether the user has answered all questions
    if (data.find((item) => item.question_id === null)) {
      Swal.fire({
        title: "Oppps..",
        text: "Looks like you missed some questions. Please check again.",
        icon: "warning",
      });
    } else {
      setLoading(true);
      submitAnswer({ data, category: { id, title } });
    }
  };

  return (
    <UserLayout>
      <BackdropLoader loading={loading} />
      <Container maxWidth="md">
        {!questions ? (
          <LoaderBox>
            <CircularProgress />
          </LoaderBox>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Grid container display="flex" flexDirection="column" mt={4}>
              <Questions questions={questions} handleChange={handleChange} />
            </Grid>
            <Grid container justifyContent="center">
              <Button variant="contained" onClick={onSubmit}>
                Submit
              </Button>
            </Grid>
          </>
        )}
      </Container>
    </UserLayout>
  );
};

export default Lesson;
