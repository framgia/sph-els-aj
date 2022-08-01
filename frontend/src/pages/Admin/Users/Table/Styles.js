import MuiTableContainer from "@mui/material/TableContainer";
import { TableCell } from "@mui/material";
import { styled } from "@mui/material";

export const TableContainer = styled(MuiTableContainer)({
  borderRadius: 15,
});

export const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.getContrastText(theme.palette.primary.dark),
}));
