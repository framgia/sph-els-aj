import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import CategoryDialog from "./CategoryDialog";
import { schema } from "./FormSchema";
import { useCategories } from "../../../hooks/categories";

const EditCategory = ({ data, onOpen, onClose }) => {
  const [open, setOpen] = useState(false);
  const { editCategory, loading, setLoading, isSuccess } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    editCategory(setError, data);
  };

  useEffect(() => {
    setOpen(onOpen);
    clearErrors();
    reset({
      id: data.id,
      title: data.title,
      description: data.description,
    });
  }, [onOpen]);

  const handleClose = (value) => {
    setOpen(value);
    onClose("edit", value);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      onClose("edit", false);
    }
  }, [isSuccess]);

  return (
    <CategoryDialog
      title="Edit Category"
      onOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      btnLoading={loading}
    >
      <TextField
        margin="normal"
        autoFocus
        label="Title"
        type="text"
        fullWidth
        variant="outlined"
        error={!!errors?.title}
        disabled={loading}
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
        disabled={loading}
        {...register("description")}
        helperText={errors?.description ? errors.description.message : null}
      />
    </CategoryDialog>
  );
};

export default EditCategory;
