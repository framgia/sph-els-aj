import { useState } from "react";
import axios from "../lib/axios";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const [loading, setLoading] = useState();
  const csrf = () => axios.get("sanctum/csrf-cookie");

  const registerUser = async ({ clearErrors, setError, ...props }) => {
    await csrf();
    try {
      props.data.type_id = 2;
      const response = await axios.post("/register", props.data);
      if (response.status === 204) {
        // redirect to login
      }
    } catch (error) {
      if (error.response.status !== 422) throw error;
      let entries = Object.entries(error.response.data.errors);
      entries.forEach(function (item) {
        setError(item[0], { type: "custom", message: item[1][0] });
      }, this);
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    setLoading,
  };
};
