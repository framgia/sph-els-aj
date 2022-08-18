import { useState } from "react";
import useSWR from "swr";

import axios from "../../lib/axios";

export const useLessonResult = (categoryId) => {
  const [loading, setLoading] = useState();

  const {
    data: questions,
    error,
    mutate,
  } = useSWR(
    categoryId ? `/api/user/lesson-result/${categoryId}` : null,
    () =>
      axios
        .get(`/api/user/lesson-result/${categoryId}`)
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
