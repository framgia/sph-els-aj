import { Box, Divider, Grid, styled, Typography } from "@mui/material";
import MuiPaper from "@mui/material/Paper";
import FormInput from "../../../components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useSettings } from "../../../hooks/User/settings";
import { PasswordSchema } from "./FormSchema";

const SecurityPaper = styled(MuiPaper)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "30px",
  paddingTop: "20px",
});

const Security = () => {
  const { changeUserPassword, loading, setLoading } = useSettings();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(PasswordSchema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    changeUserPassword(data, setError, reset);
  };

  return (
    <Grid item>
      <SecurityPaper elevation={1}>
        <Grid item>
          <Typography mb={1} ml={2} variant="h5">
            Security
          </Typography>
          <Divider />
        </Grid>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
            <FormInput
              margin="normal"
              type="password"
              label="Current Password"
              variant="outlined"
              disabled={loading}
              register={{ ...register("currentPassword") }}
              errors={errors?.currentPassword}
              required
            />
            <FormInput
              margin="normal"
              type="password"
              label="New Password"
              variant="outlined"
              disabled={loading}
              register={{ ...register("newPassword") }}
              errors={errors?.newPassword}
              required
            />
            <FormInput
              margin="normal"
              type="password"
              label="Confirm New Password"
              variant="outlined"
              disabled={loading}
              register={{ ...register("newConfirmedPassword") }}
              errors={errors?.newConfirmedPassword}
              required
            />
          </Box>
          <Divider />
          <Grid container p={2} justifyContent="right">
            <LoadingButton loading={loading} variant="contained" type="submit">
              Submit
            </LoadingButton>
          </Grid>
        </Box>
      </SecurityPaper>
    </Grid>
  );
};

export default Security;
