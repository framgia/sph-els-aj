import AdminLayout from "../AdminLayout/AdminLayout";
import CategoriesTable from "./Table/CategoriesTable";
import { TabTitle } from "../../../utils/GeneralFunctions";

const Categories = () => {
  TabTitle("Admin | Manage Categories");

  return (
    <AdminLayout navTitle="Manage Categories">
      <CategoriesTable />
    </AdminLayout>
  );
};

export default Categories;
