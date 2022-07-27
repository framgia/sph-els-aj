import { useEffect, useState } from "react";
import axios from "../lib/axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorStatus, setErrorStatus] = useState(-1);
  const navigate = useNavigate();

  const catchErrors = ({ error, setError, clearErrors }) => {
    setLoading(false);
    setErrorMessage(error.message);
    setErrorStatus(error.response.status);
    clearErrors();
    if (error.response.status !== 422) throw error;
    let entries = Object.entries(error.response.data.errors);
    entries.forEach(function (item) {
      setError(item[0], { type: "custom", message: item[1][0] });
    });
  };

  const resetErrors = () => {
    setErrorMessage("");
    setErrorStatus(-1);
  };

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/auth", () =>
    axios
      .get("/api/auth")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  const csrf = () => axios.get("sanctum/csrf-cookie");

  const registerUser = async ({ clearErrors, setError, data }) => {
    try {
      resetErrors();
      await csrf();
      const response = await axios.post("/register", data);
      if (response.status === 204) mutate();
    } catch (error) {
      catchErrors({ error, setError, clearErrors });
    }
  };

  const loginUser = async ({ clearErrors, setError, data }) => {
    try {
      resetErrors();
      await csrf();
      const response = await axios.post("/login", data);
      if (response.status === 204) mutate();
    } catch (error) {
      catchErrors({ error, setError, clearErrors });
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
      let route = user.type_id === 1 ? "/admin" : "/dashboard";
      navigate(route, { replace: true, state: { user: user } });
    }
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    registerUser,
    loginUser,
    logout,
    loading,
    setLoading,
    errorMessage,
    errorStatus,
  };
};
