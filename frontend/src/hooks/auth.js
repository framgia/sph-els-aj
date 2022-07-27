import { useState } from "react";
import axios from "../lib/axios";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  const csrf = () => axios.get("sanctum/csrf-cookie");

  const registerUser = async ({ clearErrors, setError, ...props }) => {
    setErrorMessage("");
    setIsError(false);
    try {
      await csrf();
      props.data.type_id = 2;

      const response = await axios.post("/register", props.data);

      if (response.status === 204) {
        console.log("User Registerd");
        // Will Remove in another task
      }
    } catch (error) {
      setErrorMessage(error.message);
      setIsError(true);
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
    errorMessage,
    isError,
  };
};
