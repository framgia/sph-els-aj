import { Typography } from "@mui/material";

import { useAuth } from "../../../hooks/auth";
import PagePreloader from "../../../components/PagePreloader";
import AdminLayout from "../AdminLayout/AdminLayout";

const Questions = () => {
  const { user } = useAuth();

  return (
    <AdminLayout navTitle="Manage Questions">
      {/* TODO: This will serve as the content for now, but will be
      removing in another task */}
      {!user ? (
        <PagePreloader loading={!user} size={30} />
      ) : (
        <Typography variant="span" component="h1">
          Questions - Logged In: {user?.name}
        </Typography>
      )}
    </AdminLayout>
  );
};

export default Questions;
