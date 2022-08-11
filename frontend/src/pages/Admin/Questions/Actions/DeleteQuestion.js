import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { useQuestions } from "../../../../hooks/questions";
import { QuestionActions } from "../../../../utils/ActionConstants";
import QuestionDialog from "../QuestionDialog";

const DeleteQuestion = ({ onOpen, onClose, categoryId, data }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { deleteQuestion, loading, setLoading, isSuccess } = useQuestions({
    categoryId,
  });

  useEffect(() => {
    setOpenDialog(onOpen);
  }, [onOpen]);

  const handleClose = (value) => {
    setOpenDialog(value);
    onClose(QuestionActions.DELETE_QUESTION, value);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenDialog(false);
      onClose(QuestionActions.DELETE_QUESTION, false);
    }
  }, [isSuccess]);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    deleteQuestion(null, data.id);
  };

  return (
    <QuestionDialog
      title="Delete Question"
      onOpen={openDialog}
      onClose={handleClose}
      onSubmit={onSubmit}
      btnLoading={loading}
    >
      <Typography variant="p">
        Are you sure you want to delete this category?
      </Typography>
    </QuestionDialog>
  );
};

export default DeleteQuestion;
