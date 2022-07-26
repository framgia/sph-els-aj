import { Box, Avatar, Button, styled } from "@mui/material";

export const CustomBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
}));

export const FormBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
}));

export const SignUpBtn = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
}));