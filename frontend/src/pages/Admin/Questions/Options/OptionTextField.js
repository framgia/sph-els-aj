import { styled } from "@mui/material";

import MuiGrid from "@mui/material/Grid";
import MuiTextField from "@mui/material/TextField";

const Grid = styled(MuiGrid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const TextField = styled(MuiTextField)({
  width: "95%",
});

const OptionTextField = ({ index, errors, register, disabled, value }) => {
  return (
    <Grid item xs={9}>
      <TextField
        margin="normal"
        name={`options[${index}].value`}
        label={`Option #${index + 1}`}
        type="text"
        variant="outlined"
        error={!!errors.options?.[`${index}`]?.value}
        disabled={disabled}
        {...register(`options[${index}].value`)}
        helperText={
          errors?.options?.[`${index}`]?.value
            ? errors?.options?.[`${index}`]?.value.message
            : null
        }
        defaultValue={value}
      />
    </Grid>
  );
};

export default OptionTextField;
