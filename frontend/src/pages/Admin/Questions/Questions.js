import { useState } from "react";

import { TabTitle } from "../../../utils/GeneralFunctions";
import AdminLayout from "../AdminLayout/AdminLayout";
import QuestionsTable from "./Table/QuestionsTable";

const Questions = () => {
  TabTitle("Admin | Manage Questions");

  // TODO: Will be using this states in another task
  const [onAdd, setOnAdd] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [data, setData] = useState();

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
    <AdminLayout navTitle="Manage Questions">
      <QuestionsTable onOpen={handleOpen} />
    </AdminLayout>
  );
};

export default Questions;
