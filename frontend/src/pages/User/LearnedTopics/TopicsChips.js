import { HighlightOff, Done } from "@mui/icons-material";
import { Chip } from "@mui/material";

export const IsCorrectIcon = ({ correctAnswer, yourAnswer }) => {
  return correctAnswer === yourAnswer ? (
    <Done color="success" />
  ) : (
    <HighlightOff color="error" />
  );
};

export const CorrectAnswerChip = ({ correctAnswer, yourAnswer }) => {
  return correctAnswer !== yourAnswer ? (
    <Chip
      label={correctAnswer}
      icon={<Done />}
      color="success"
      sx={{ mr: 1 }}
    />
  ) : null;
};
