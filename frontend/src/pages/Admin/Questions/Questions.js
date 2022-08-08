import { useState } from "react";

import AdminLayout from "../AdminLayout/AdminLayout";
import AddQuestion from "./Actions/AddQuestion";
import QuestionsTable from "./Table/QuestionsTable";
import { TabTitle } from "../../../utils/GeneralFunctions";
import { QuestionActions } from "../../../utils/ActionConstants";

const Questions = () => {
  TabTitle("Admin | Manage Questions");

  // TODO: Will be using this unused states in another task
  const [onAdd, setOnAdd] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState(0);

  const handleDialog = (action, isOpen, data, categoryId) => {
    setId(categoryId);
    switch (action) {
      case QuestionActions.EDIT_QUESTION:
        setOnEdit(isOpen);
        if (isOpen) setData(data);
        break;
      case QuestionActions.DELETE_QUESTION:
        setOnDelete(isOpen);
        if (isOpen) setData(data);
        break;
      default:
        setOnAdd(isOpen);
    }
  };

  return (
    <AdminLayout navTitle="Manage Questions">
      <QuestionsTable onOpen={handleDialog} />
      <AddQuestion onOpen={onAdd} onClose={handleDialog} categoryId={id} />
    </AdminLayout>
  );
};

export default Questions;
