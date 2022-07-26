import { Box, Avatar, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";

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

export const SignUpBtn = styled(LoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));
