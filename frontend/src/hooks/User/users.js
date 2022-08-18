import { useState } from "react";
import useSWR from "swr";

import axios from "../../lib/axios";

export const useUserList = () => {
  const [loading, setLoading] = useState(false);

  const {
    data: users,
    mutate,
    error,
  } = useSWR(
    "/api/user/profile",
    () =>
      axios
        .get("/api/user/profile")
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

  return {
    users,
    error,
    mutate,
    loading,
    setLoading,
  };
};
