import { useState } from "react";
import useSWR from "swr";

import axios from "../../lib/axios";

export const useUserQuestions = (categoryId) => {
  const [loading, setLoading] = useState();

  const {
    data: questions,
    error,
    mutate,
  } = useSWR(
    categoryId ? `/api/user/category/${categoryId}/lesson` : null,
    () =>
      axios
        .get(`/api/user/category/${categoryId}/lesson`)
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
  };
};
