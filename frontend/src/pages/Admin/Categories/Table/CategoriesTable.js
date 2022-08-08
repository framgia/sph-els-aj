import { Delete, Edit } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import MaterialTable from "material-table";
import moment from "moment";

import { tableIcons } from "../../../../utils/TableIcons";
import AddCategoryButton from "./AddCategoryButton";
import { useCategories } from "../../../../hooks/categories";
import { CategoryActions } from "../../../../utils/ActionConstants";

const CategoriesTable = ({ onOpen }) => {
  const { categories, isValidating } = useCategories();

  const handleDelete = (data) => {
    onOpen(CategoryActions.DELETE_CATEGORY, true, data);
  };

  const handleEdit = (data) => {
    onOpen(CategoryActions.EDIT_CATEGORY, true, data);
  };

  const handleAdd = () => {
    onOpen(CategoryActions.ADD_CATEGORY, true, null);
  };

  return (
    <>
      <Box style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          title="Categories Table"
          columns={[
            { title: "Title", field: "title" },
            { title: "Description", field: "description" },
            {
              title: "Date Created",
              field: "created_at",
              render: (rowData) => (
                <Typography>
                  {moment(rowData.created_at).format("MMMM Do YYYY")}
                </Typography>
              ),
            },
          ]}
          data={categories}
          isLoading={isValidating}
          actions={[
            {
              icon: () => <Edit />,
              tooltip: "Edit Category",
              onClick: (event, rowData) => handleEdit(rowData),
            },
            (rowData) => ({
              icon: () => <Delete />,
              tooltip: "Delete Category",
              onClick: (event, rowData) => handleDelete(rowData),
            }),
          ]}
          options={{ actionsColumnIndex: -1 }}
        />
      </Box>
      <AddCategoryButton onAdd={handleAdd} />
    </>
  );
};

export default CategoriesTable;
