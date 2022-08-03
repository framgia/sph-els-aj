import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function FormDialog({
  onOpen,
  onClose,
  onSubmit,
  title,
  children,
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  useEffect(() => {
    setOpen(onOpen);
  }, [onOpen]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{ padding: "0px" }}
      >
        <DialogContent sx={{ py: 0 }}>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
