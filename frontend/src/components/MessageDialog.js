import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const MessageDialog = ({
  onClose,
  open,
  message,
  severity = "success",
  autoHideDuration = 6000,
  anchorOrigin = { vertical: "top", horizontal: "right" },
}) => {
  const [openSnackBar, setOpenSnackBar] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose(false);
    setOpenSnackBar(false);
  };

  useEffect(() => {
    console.log("Use Effect: ", open);
    setOpenSnackBar(open);
  }, [open]);

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={openSnackBar}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageDialog;
