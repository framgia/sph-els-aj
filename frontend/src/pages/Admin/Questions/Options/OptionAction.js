import { AddCircle, Delete } from "@mui/icons-material";
import { styled } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiIconButon from "@mui/material/IconButton";

import { OptionActions } from "../../../../utils/ActionConstants";

const Grid = styled(MuiGrid)({
  display: "flex",
  alignItems: "flex-center",
  justifyContent: "center",
});

const IconButton = styled(MuiIconButon)({
  height: "45px",
  marginTop: "20px",
  borderRadius: "50%",
  ".MuiTouchRipple-ripple .MuiTouchRipple-child": {
    height: "45px",
    borderRadius: "50%",
  },
});

const setAriaLabel = (action) => {
  switch (action) {
    case OptionActions.ADD_OPTION:
      return "add-option";
    default:
      return "remove-option";
  }
};

const actionButton = (action) => {
  switch (action) {
    case OptionActions.ADD_OPTION:
      return <AddCircle />;
    default:
      return <Delete />;
  }
};

const OptionAction = ({ action, disabled, handleOnClick }) => {
  return (
    <Grid item xs={1}>
      <IconButton
        disabled={disabled}
        aria-label={setAriaLabel(action)}
        onClick={handleOnClick}
      >
        {actionButton(action)}
      </IconButton>
    </Grid>
  );
};

export default OptionAction;
