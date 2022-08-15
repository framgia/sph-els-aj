import { FormControlLabel, Radio } from "@mui/material";

const Options = ({ option, handleChange, questionIndex }) => {
  const { id, value, question_id, is_correct } = option;
  return (
    <>
      <FormControlLabel
        value={id}
        control={<Radio />}
        onChange={(e) =>
          handleChange(e, {
            id,
            question_id,
            questionIndex,
            is_correct,
          })
        }
        label={value}
      />
    </>
  );
};

export default Options;
