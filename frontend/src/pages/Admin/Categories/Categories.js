import { useState } from "react";

import AdminLayout from "../AdminLayout/AdminLayout";
import CategoriesTable from "./Table/CategoriesTable";
import { TabTitle } from "../../../utils/GeneralFunctions";
import { CategoryActions } from "../../../utils/ActionConstants";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const Categories = () => {
  TabTitle("Admin | Manage Categories");

  const [onAdd, setOnAdd] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);

  const [data, setData] = useState({
    id: 0,
    title: "",
    description: "",
  });

  const handleDialog = (action, isOpen, data) => {
    switch (action) {
      case CategoryActions.EDIT_CATEGORY:
        setOnEdit(isOpen);
        if (isOpen) setData(data);
        break;
      case CategoryActions.DELETE_CATEGORY:
        setOnDelete(isOpen);
        if (isOpen) setData(data);
        break;
      default:
        setOnAdd(isOpen);
    }
  };

  return (
    <AdminLayout navTitle="Manage Categories">
      <CategoriesTable onOpen={handleDialog} />
      <AddCategory onOpen={onAdd} onClose={handleDialog} />
      <EditCategory data={data} onOpen={onEdit} onClose={handleDialog} />
      <DeleteCategory id={data.id} onOpen={onDelete} onClose={handleDialog} />
    </AdminLayout>
  );
};

export default Categories;
