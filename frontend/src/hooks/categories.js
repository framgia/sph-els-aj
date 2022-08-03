import useSWR from "swr";

import axios from "../lib/axios";

export const useCategories = () => {
  const {
    data: categories,
    error,
    mutate,
    loading,
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

  return {
    categories,
    error,
    mutate,
    loading,
  };
};
