import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import CategoryDialog from "./CategoryDialog";
import { schema } from "./FormSchema";

export const AddCategory = ({ onOpen, onClose }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // TODO: Will add functionality in another task
  };

  useEffect(() => {
    setOpen(onOpen);
    clearErrors();
    reset({
      title: "",
      description: "",
    });
  }, [onOpen]);

  const handleClose = (value) => {
    setOpen(value);
    onClose(value);
  };

  return (
    <CategoryDialog
      title="Add Category"
      onOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        margin="normal"
        autoFocus
        label="Title"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors?.title}
        {...register("title")}
        helperText={errors?.title ? errors.title.message : null}
      />
      <TextField
        margin="normal"
        label="Description"
        multiline
        fullWidth
        rows={4}
        error={!!errors?.description}
        {...register("description")}
        helperText={errors?.description ? errors.description.message : null}
      />
    </CategoryDialog>
  );
};
