import { useEffect } from "react";
import { Box, Divider, Grid, styled, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import MuiPaper from "@mui/material/Paper";

import { BasicDetailsSchema } from "./FormSchema";
import FormInput from "../../../components/FormInput";
import { useSettings } from "../../../hooks/User/settings";

const BasicDetailsPaper = styled(MuiPaper)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "30px",
  paddingTop: "20px",
});

const BasicDetails = ({ user }) => {
  const { id, name, email } = user;
  const { updateUserBasicDetails, loading, setLoading } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(BasicDetailsSchema),
  });

  useEffect(() => {
    reset({
      name: name,
      email: email,
    });
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    updateUserBasicDetails({ ...data, id: id }, setError);
  };

  return (
    <BasicDetailsPaper elevation={1}>
      <Grid item>
        <Typography mb={1} ml={2} variant="h5">
          Basic Details
        </Typography>
      </Grid>
      <Divider />
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
          <FormInput
            margin="normal"
            type="text"
            label="Name"
            variant="outlined"
            disabled={loading}
            register={{ ...register("name") }}
            errors={errors?.name}
            required
          />
          <FormInput
            margin="normal"
            type="text"
            label="Email"
            variant="outlined"
            disabled={loading}
            register={{ ...register("email") }}
            errors={errors?.email}
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
    </BasicDetailsPaper>
  );
};

export default BasicDetails;
