import {
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { School } from "@mui/icons-material";
import { LeftGrid } from "./Styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./FormSchema";

export default function SignInSide() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // clearErrors,
    // setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Will remove in another task
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <LeftGrid item xs={false} sm={4} md={7} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sm={8}
          sx={{
            my: "20%",
            mx: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <School />
            </Avatar>
            <Typography component="h1" variant="h5">
              E-Learning System
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography component="h2" variant="h6">
              Login to start your session
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors?.email}
              {...register("email")}
              helperText={errors?.email ? "The " + errors.email.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors?.email}
              {...register("password")}
              helperText={
                errors?.password ? "The " + errors.password.message : null
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
