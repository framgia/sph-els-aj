import {
  CardContent,
  FormControl,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import MuiCard from "@mui/material/Card";

import Options from "./Options";

const Card = styled(MuiCard)({
  height: "100%",
  justifyContent: "space-between",
  display: "flex",
  flexDirection: "row",
  marginBottom: "30px",
});

const Questions = ({ questions, handleChange }) => {
  return (
    questions &&
    questions.map(({ id, value, options }, questionIndex) => (
      <Card key={id}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ wordWrap: "break-word" }}
          >
            {value}
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="option-radio-group"
              name="option-radio-group"
            >
              {options.map(
                (option) => (
                  <Options
                    key={option.id}
                    option={option}
                    questionIndex={questionIndex}
                    handleChange={handleChange}
                  />
                ),
                questionIndex
              )}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    ))
  );
};

export default Questions;
