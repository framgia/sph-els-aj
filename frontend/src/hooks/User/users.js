import useSWR from "swr";

import axios from "../../lib/axios";

export const useUserList = () => {
  const { data: users, error } = useSWR(
    "/api/user/user",
    () =>
      axios
        .get("/api/user/user")
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
  };
};
