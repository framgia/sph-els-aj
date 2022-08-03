import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/material";
import MaterialTable from "material-table";

import { tableIcons } from "../../../../utils/TableIcons";
import AddCategoryButton from "./AddCategoryButton";

/* TODO: As of now the content has static data.
    Will Fetch the data from the API 
    in [BE/FE] Fetch Data to Category List Task.
*/
const CategoriesTable = () => {
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
          data={[
            {
              title: "Basic 500",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, voluptate impedit hic at eaque facere. Laboriosam atque quae nulla cumque consequatur saepe laudantium corporis eveniet molestias eius, dolores voluptatem rem!",
              created_at: "August 02, 2022",
            },
          ]}
          isLoading={false}
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
