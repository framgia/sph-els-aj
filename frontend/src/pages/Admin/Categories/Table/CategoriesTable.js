import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/material";
import MaterialTable from "material-table";

import { tableIcons } from "../../../../utils/TableIcons";
import AddCategoryButton from "./AddCategoryButton";
import { useCategories } from "../../../../hooks/categories";

const CategoriesTable = () => {
  const { categories, loading } = useCategories();

  const onDelete = (data) => {
    /* TODO: Will Provide functionality in 
    [BE/FE] Delete selected Category task*/
  };

  const onEdit = (data) => {
    /* TODO: Will Provide functionality in 
    [BE/FE] Edit selected Category task*/
  };

  const onAdd = () => {
    /* TODO: Will Provide functionality in 
    [BE/FE] Insert New Category task*/
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
            { title: "Date Created", field: "created_at" },
          ]}
          data={categories}
          isLoading={loading}
          actions={[
            {
              icon: () => <Edit />,
              tooltip: "Edit Category",
              onClick: (event, rowData) => onEdit(rowData),
            },
            (rowData) => ({
              icon: () => <Delete />,
              tooltip: "Delete Category",
              onClick: (event, rowData) => onDelete(rowData),
            }),
          ]}
          options={{ actionsColumnIndex: -1 }}
        />
      </Box>
      <AddCategoryButton onAdd={onAdd} />
    </>
  );
};

export default CategoriesTable;
