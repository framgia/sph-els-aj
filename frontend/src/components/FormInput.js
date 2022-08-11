import { TextField } from "@mui/material";

const FormInput = ({ label, errors, register, disabled, ...inputProps }) => {
  return (
    <TextField
      label={label}
      error={!!errors}
      disabled={disabled}
      helperText={errors ? errors.message : null}
      {...register}
      {...inputProps}
    />
  );
};

export default FormInput;
