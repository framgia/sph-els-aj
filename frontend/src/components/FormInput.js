import { TextField } from "@mui/material";

const FormInput = ({ label, errors, register, loading, ...inputProps }) => {
  return (
    <TextField
      label={label}
      error={!!errors}
      disabled={loading}
      helperText={errors ? errors.message : null}
      {...register}
      {...inputProps}
    />
  );
};

export default FormInput;
