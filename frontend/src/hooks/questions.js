import { useState } from "react";
import useSWR from "swr";

import { Toast } from "../utils/GeneralFunctions";
import axios from "../lib/axios";

export const useQuestions = ({ categoryId }) => {
  const [loading, setLoading] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    data: questions,
    error,
    mutate,
    isValidating,
  } = useSWR(
    categoryId ? `/api/category/${categoryId}/question` : null,
    () =>
      axios
        .get(`/api/category/${categoryId}/question`)
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

  return {
    questions,
    error,
    mutate,
    loading,
    setLoading,
    isSuccess,
    isValidating,
  };
};
