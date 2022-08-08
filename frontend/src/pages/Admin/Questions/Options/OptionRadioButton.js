import { Radio, styled } from "@mui/material";
import MuiGrid from "@mui/material/Grid";

const Grid = styled(MuiGrid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const OptionRadioButton = ({ index, is_correct, handleChange }) => {
  return (
    <Grid item xs={1}>
      <Radio
        color="success"
        checked={is_correct}
        onChange={(e) => handleChange(e, index)}
      />
    </Grid>
  );
};

export default OptionRadioButton;
