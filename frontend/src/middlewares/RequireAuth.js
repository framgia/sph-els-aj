import { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from "../lib/axios";

import PagePreloader from "../components/PagePreloader";

const RequireAuth = ({ role }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/auth");
      setUser(res.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) return <PagePreloader loading={loading} size={30} />;

  return (
    user &&
    (user.type_id === role ? (
      <Outlet />
    ) : user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    ))
  );
};

export default RequireAuth;
