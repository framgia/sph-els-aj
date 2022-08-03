import { Add } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";

const AddCategoryButton = ({ onAdd }) => {
  return (
    <Tooltip
      title="Add Category"
      placement="top"
      sx={{
        position: "fixed",
        bottom: 30,
        left: { xs: "calc(50% - 25px)", lg: "93%" },
      }}
    >
      <Fab color="primary" aria-label="add" onClick={onAdd}>
        <Add />
      </Fab>
    </Tooltip>
  );
};

export default AddCategoryButton;
