import useSWR from "swr";

import axios from "../lib/axios";

export const useUserList = () => {
  const {
    data: users,
    error,
    mutate,
    loading,
    isValidating,
  } = useSWR(
    "/api/admin/user",
    () =>
      axios
        .get("/api/admin/user")
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    users,
    error,
    mutate,
    loading,
    isValidating,
  };
};
