import { useState } from "react";

import AdminLayout from "../AdminLayout/AdminLayout";
import CategoriesTable from "./Table/CategoriesTable";
import { TabTitle } from "../../../utils/GeneralFunctions";
import { AddCategory } from "./AddCategory";

const Categories = () => {
  TabTitle("Admin | Manage Categories");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(value);
  };

  return (
    <AdminLayout navTitle="Manage Categories">
      <CategoriesTable onAdd={handleOpen} />
      <AddCategory onOpen={open} onClose={handleClose} />
    </AdminLayout>
  );
};

export default Categories;
