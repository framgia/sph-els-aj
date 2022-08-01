import AdminLayout from "../AdminLayout/AdminLayout";
import UserTable from "./Table/UserTable";

const Users = () => {
  return (
    <AdminLayout navTitle="User List">
      <UserTable />
    </AdminLayout>
  );
};

export default Users;
