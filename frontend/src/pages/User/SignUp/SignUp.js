import { School } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    Paper,
    CssBaseline,
    TextField,
    Typography,
    Container,
    Grid,
} from "@mui/material";
import { CustomBox, CustomAvatar, FormBox, SignUpBtn } from "./Styles";
import { schema } from "./FormSchema";

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={3}>
                <CustomBox>
                    <CustomAvatar>
                        <School />
                    </CustomAvatar>
                    <Typography component="h1" variant="h5">
                        Sign in
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
                            helperText={
                                errors?.name ? errors.name.message : null
                            }
                        />
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
                            helperText={
                                errors?.email ? errors.email.message : null
                            }
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
                            error={!!errors?.password}
                            {...register("password")}
                            helperText={
                                errors?.password
                                    ? errors.password.message
                                    : null
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="cofirm-password"
                            {...register("confirmPassword")}
                            helperText={
                                errors?.confirmPassword
                                    ? "Passwords should match!"
                                    : null
                            }
                            error={!!errors?.confirmPassword}
                        />
                        <SignUpBtn type="submit" fullWidth variant="contained">
                            Sign In
                        </SignUpBtn>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>{"Don't have an account? Sign Up"}</Grid>
                        </Grid>
                    </FormBox>
                </CustomBox>
            </Paper>
        </Container>
    );
}