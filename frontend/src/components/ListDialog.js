import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect } from "react";

export default function ScrollDialog({
  title,
  isOpen,
  handleDialog,
  children,
}) {
  const handleClose = () => {
    handleDialog(false);
  };

  useEffect(() => {
    if (isOpen) {
      handleDialog(true);
    }
  }, [isOpen]);

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} scroll="paper" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers sx={{ padding: 0 }}>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
