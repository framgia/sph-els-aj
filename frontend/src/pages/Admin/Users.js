import { Typography } from "@mui/material";

import { useAuth } from "../../hooks/auth";
import AdminLayout from "./AdminLayout/AdminLayout";
import PagePreloader from "../../components/PagePreloader";

const Users = () => {
  const { user } = useAuth();

  return (
    <AdminLayout navTitle="User List">
      {/* TODO: This will serve as the content for now, but will be
      removing in another task */}
      {!user ? (
        <PagePreloader loading={!user} size={30} />
      ) : (
        <Typography variant="span" component="h1">
          Users - Logged In: {user?.name}
        </Typography>
      )}
    </AdminLayout>
  );
};

export default Users;
