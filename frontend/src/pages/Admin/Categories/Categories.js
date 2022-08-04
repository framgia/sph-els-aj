import { useState } from "react";

import AdminLayout from "../AdminLayout/AdminLayout";
import CategoriesTable from "./Table/CategoriesTable";
import { TabTitle } from "../../../utils/GeneralFunctions";
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

  const handleOpen = (action, isOpen, data) => {
    switch (action) {
      case "edit":
        setOnEdit(isOpen);
        if (isOpen) setData(data);
        break;
      case "delete":
        setOnDelete(isOpen);
        if (isOpen) setData(data);
        break;
      default:
        setOnAdd(isOpen);
    }
  };

  return (
    <AdminLayout navTitle="Manage Categories">
      <CategoriesTable onOpen={handleOpen} />
      <AddCategory onOpen={onAdd} onClose={handleOpen} />
      <EditCategory data={data} onOpen={onEdit} onClose={handleOpen} />
      <DeleteCategory id={data.id} onOpen={onDelete} onClose={handleOpen} />
    </AdminLayout>
  );
};

export default Categories;
