import { Delete, Edit } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import MaterialTable from "material-table";
import moment from "moment";

import { tableIcons } from "../../../../utils/TableIcons";
import { useQuestions } from "../../../../hooks/questions";
import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";
import AddQuestionButton from "./AddQuestionButton";

const QuestionsTable = ({ onOpen }) => {
  const [categoryId, setCategoryId] = useState();
  const { questions, isValidating } = useQuestions({ categoryId });

  const handleDelete = (data) => {
    // TODO: Will be adding functionality on another task
    // onOpen("delete", true, data);
  };

  const handleEdit = (data) => {
    // TODO: Will be adding functionality on another task
    // onOpen("edit", true, data);
  };

  const handleAdd = () => {
    // TODO: Will be adding functionality on another task
    // onOpen("add", true, null);
  };

  const selectedCategoryId = (data) => {
    setCategoryId(data);
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
        <CategoryDropdown getCategory={selectedCategoryId} />
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
      <AddQuestionButton onAdd={handleAdd} onDisable={!questions} />
    </>
  );
};

export default QuestionsTable;
