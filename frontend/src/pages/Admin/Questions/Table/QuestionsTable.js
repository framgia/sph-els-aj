import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import MaterialTable from "material-table";
import moment from "moment";

import { tableIcons } from "../../../../utils/TableIcons";
import { useQuestions } from "../../../../hooks/questions";
import { QuestionActions } from "../../../../utils/ActionConstants";
import CategoryDropdown from "./CategoryDropdown";
import AddQuestionButton from "./AddQuestionButton";

const QuestionsTable = ({ onOpen }) => {
  const [categoryId, setCategoryId] = useState(null);
  const { questions, isValidating } = useQuestions({ categoryId });
  const [length, setLength] = useState(0);

  const handleDelete = (data) => {
    onOpen(QuestionActions.DELETE_QUESTION, true, data, categoryId);
  };

  const handleEdit = (data) => {
    onOpen(QuestionActions.EDIT_QUESTION, true, data, categoryId);
  };

  const handleAdd = () => {
    onOpen(QuestionActions.ADD_QUESTION, true, null, categoryId);
  };

  /* NOTE: Purpose of this function is to check 
  the length of the categories. If it's zero then the
  Add Button would be disabled */
  const handleLength = (dataLength) => {
    setLength(dataLength);
  };

  const selectedCategoryId = (id) => {
    setCategoryId(id);
  };

  const actions = [
    {
      icon: () => <Edit />,
      tooltip: "Edit Question",
      onClick: (event, rowData) => handleEdit(rowData),
    },
    (rowData) => ({
      icon: () => <Delete />,
      tooltip: "Delete Question",
      onClick: (event, rowData) => handleDelete(rowData),
    }),
  ];

  const columns = [
    { title: "Question", field: "value" },
    {
      title: "Date Created",
      field: "created_at",
      render: (rowData) => (
        <Typography>
          {moment(rowData.created_at).format("MMMM Do YYYY")}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Paper sx={{ px: 5, pb: 5 }}>
        <CategoryDropdown
          getCategory={selectedCategoryId}
          dataLength={handleLength}
        />
        <MaterialTable
          icons={tableIcons}
          title="Questions Table"
          columns={columns}
          data={questions}
          isLoading={isValidating}
          actions={actions}
          options={{ actionsColumnIndex: -1 }}
        />
      </Paper>
      <AddQuestionButton onAdd={handleAdd} onDisable={length === 0} />
    </>
  );
};

export default QuestionsTable;
