import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { schema } from "../FormSchema";
import { useQuestions } from "../../../../hooks/questions";
import { QuestionActions } from "../../../../utils/ActionConstants";
import Options from "../Options/Options";
import QuestionDialog from "../QuestionDialog";
import FormInput from "../../../../components/FormInput";

const AddQuestion = ({ onOpen, onClose, categoryId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { addQuestion, loading, setLoading, isSuccess } = useQuestions({
    categoryId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    getValues,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setOpenDialog(onOpen);
    reset({
      value: "",
      options: [
        { value: "", is_correct: true },
        { value: "", is_correct: false },
      ],
    });
  }, [onOpen]);

  const handleClose = (value) => {
    setOpenDialog(value);
    onClose(QuestionActions.ADD_QUESTION, value);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenDialog(false);
      onClose(QuestionActions.ADD_QUESTION, false);
    }
  }, [isSuccess]);

  const onSubmit = (data) => {
    setLoading(true);
    addQuestion(setError, data);
  };

  return (
    <QuestionDialog
      title="Add Question"
      onOpen={openDialog}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      btnLoading={loading}
    >
      <FormInput
        margin="normal"
        type="text"
        label="Question"
        variant="outlined"
        disabled={loading}
        autoFocus
        required
        fullWidth
        errors={errors?.value}
        register={{ ...register("value") }}
      />
      <Options
        control={control}
        getValues={getValues}
        errors={errors}
        register={register}
        disabled={loading}
      />
    </QuestionDialog>
  );
};

export default AddQuestion;
