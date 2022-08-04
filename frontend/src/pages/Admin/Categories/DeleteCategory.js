import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CategoryDialog from "./CategoryDialog";
import { useCategories } from "../../../hooks/categories";

const DeleteCategory = ({ id, onOpen, onClose }) => {
  const [open, setOpen] = useState(false);
  const { deleteCategory, loading, setLoading, isSuccess } = useCategories();

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    deleteCategory(id);
  };

  useEffect(() => {
    setOpen(onOpen);
  }, [onOpen]);

  const handleClose = (value) => {
    setOpen(value);
    onClose("delete", value);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      onClose("delete", false);
    }
  }, [isSuccess]);

  return (
    <CategoryDialog
      title="Delete Category"
      onOpen={open}
      onClose={handleClose}
      onSubmit={onSubmit}
      btnLoading={loading}
    >
      <Typography variant="p">
        Are you sure you want to delete this category?
      </Typography>
    </CategoryDialog>
  );
};

export default DeleteCategory;
