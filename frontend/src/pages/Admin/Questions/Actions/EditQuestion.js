import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { schema } from "../FormSchema";
import { useQuestions } from "../../../../hooks/questions";
import { QuestionActions } from "../../../../utils/ActionConstants";
import Options from "../Options/Options";
import QuestionDialog from "../QuestionDialog";
import FormInput from "../../../../components/FormInput";

const EditQuestion = ({ data, onOpen, onClose, categoryId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { editQuestion, loading, setLoading, isSuccess } = useQuestions({
    categoryId,
  });
  const { id, value, options } = data ?? {};

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
      id: id,
      value: value,
      options: options,
    });
  }, [onOpen]);

  const handleClose = (value) => {
    setOpenDialog(value);
    onClose(QuestionActions.EDIT_QUESTION, value);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenDialog(false);
      onClose(QuestionActions.EDIT_QUESTION, false);
    }
  }, [isSuccess]);

  const onSubmit = (data) => {
    setLoading(true);
    editQuestion(setError, data);
  };

  return (
    <QuestionDialog
      title="Edit Question"
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

export default EditQuestion;
