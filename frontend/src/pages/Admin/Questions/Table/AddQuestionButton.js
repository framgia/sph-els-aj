import { Add } from "@mui/icons-material";
import { Box, Fab, Tooltip } from "@mui/material";

const AddQuestionButton = ({ onAdd, onDisable }) => {
  return (
    <Tooltip
      title="Add Question"
      placement="top"
      sx={{
        position: "fixed",
        bottom: 30,
        left: { xs: "calc(50% - 25px)", lg: "93%" },
      }}
    >
      <Box component="span">
        <Fab
          color="primary"
          aria-label="add"
          onClick={onAdd}
          disabled={onDisable}
        >
          <Add />
        </Fab>
      </Box>
    </Tooltip>
  );
};

export default AddQuestionButton;
