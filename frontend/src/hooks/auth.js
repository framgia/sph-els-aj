import { useEffect, useState } from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

import { Toast } from "../utils/GeneralFunctions";
import axios from "../lib/axios";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const catchErrors = ({ error, setError }) => {
    setLoading(false);
    if (error.response.status !== 422) {
      Toast(error.message, "error");
      throw error;
    }
    let entries = Object.entries(error.response.data.errors);
    entries.forEach(function (item) {
      setError(item[0], { type: "custom", message: item[1][0] });
    });
  };

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/api/auth",
    () =>
      axios
        .get("/api/auth")
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  const csrf = () => axios.get("sanctum/csrf-cookie");

  const registerUser = async ({ setError, data }) => {
    try {
      await csrf();
      const response = await axios.post("/register", data);
      if (response.status === 204) mutate();
    } catch (error) {
      catchErrors({ error, setError });
    }
  };

  const loginUser = async ({ setError, data }) => {
    try {
      await csrf();
      const response = await axios.post("/login", data);
      if (response.status === 204) mutate();
    } catch (error) {
      catchErrors({ error, setError });
    }
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }
    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      let route = user?.type?.id === 1 ? "/admin/users" : "/dashboard";
      navigate(route, { replace: true, state: { user: user, open: true } });
    }
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    registerUser,
    loginUser,
    logout,
    isLoading: !error && !user,
    loading,
    setLoading,
  };
};
