import { useState } from "react";
import useSWR from "swr";
import { Toast } from "../utils/GeneralFunctions";

import axios from "../lib/axios";

export const useCategories = () => {
  const [loading, setLoading] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    data: categories,
    error,
    mutate,
    isValidating,
  } = useSWR(
    "/api/category",
    () =>
      axios
        .get("/api/category")
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const catchErrors = ({ error, setError }) => {
    setIsSuccess(false);
    if (error.response.status !== 422) {
      Toast(error.message, "error");
      throw error;
    }
    let entries = Object.entries(error.response.data.errors);
    entries.forEach(function (item) {
      setError(item[0], { type: "custom", message: item[1][0] });
    });
  };

  const addCategory = async (setError, data) => {
    try {
      setIsSuccess(false);
      const response = await axios.post("/api/category", data);
      if (response.status === 200) {
        setIsSuccess(true);
        Toast("Category added successfully!", "success");
        mutate();
      }
    } catch (error) {
      catchErrors({ error, setError });
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    error,
    mutate,
    loading,
    setLoading,
    addCategory,
    isSuccess,
    isValidating,
  };
};
