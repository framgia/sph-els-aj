import { Box, CircularProgress, Container, styled } from "@mui/material";
import { useLocation } from "react-router-dom";

import { useLessonResult } from "../../../../hooks/User/result";
import { TabTitle } from "../../../../utils/GeneralFunctions";
import UserLayout from "../../UserLayout/UserLayout";
import HeaderResult from "./HeaderResult";
import ResultList from "./ResultList";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "50vh",
});

const Result = () => {
  const location = useLocation();
  const { state } = location;
  const { id, title } = state;
  const { questions } = useLessonResult(id);

  TabTitle(`Lesson | ${title} | Result`);

  return (
    <UserLayout>
      <Container maxWidth="md">
        {!questions ? (
          <LoaderBox>
            <CircularProgress />
          </LoaderBox>
        ) : (
          <>
            <HeaderResult title={title} questions={questions} />
            <ResultList questions={questions} />
          </>
        )}
      </Container>
    </UserLayout>
  );
};

export default Result;
