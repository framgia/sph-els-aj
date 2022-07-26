import {
  Paper,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Grid,
  Link,
  Box
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { School } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../hooks/auth";
import { CustomBox, CustomAvatar, FormBox, SignUpBtn } from "./Styles";
import { schema } from "./FormSchema";
import MessageDialog from "../../../components/MessageDialog";
import { useEffect, useState } from "react";

export default function SignIn() {
  const { registerUser, loading, setLoading, errorMessage, isError } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    registerUser({ setError, clearErrors, data });
  };

  const handleClose = (value) => {
    setOpenMessageDialog(value);
  };
  const [openMessageDialog, setOpenMessageDialog] = useState(false);

  useEffect(() => {
    if (isError) {
      setOpenMessageDialog(true);
    }
  }, [isError]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3}>
        <CustomBox>
          <Box
            sx={{ mt: 2, display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CustomAvatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <School />
            </CustomAvatar>
            <Typography component="h1" variant="h5">
              E-Learning System
            </Typography>
          </Box>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <FormBox
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              {...register("name")}
              error={!!errors?.name}
              helperText={errors?.name ? 'The ' + errors.name.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!errors?.email}
              {...register("email")}
              helperText={errors?.email ? 'The ' + errors.email.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete="password"
              error={!!errors?.password}
              {...register("password")}
              helperText={errors?.password ? 'The ' + errors.password.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="cofirm-password   "
              {...register("password_confirmation")}
              helperText={
                errors?.password_confirmation
                  ? "The password field should match"
                  : null
              }
              error={!!errors?.password_confirmation}
            />
            <SignUpBtn
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
            >
              Sign Up
            </SignUpBtn>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <Link component={RouterLink} to="/" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </FormBox>
        </CustomBox>
      </Paper>
      <MessageDialog
        message={errorMessage}
        open={openMessageDialog}
        severity="error"
        onClose={handleClose}
      />
    </Container>
  );
}
