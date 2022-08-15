import { useState } from "react";
import useSWR from "swr";

import axios from "../../lib/axios";
import { Toast } from "../../utils/GeneralFunctions";

export const useUserList = () => {
  const [loading, setLoading] = useState(false);

  const {
    data: users,
    error,
    mutate,
  } = useSWR(
    "/api/user",
    () =>
      axios
        .get("/api/user")
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

  const followUser = async (data) => {
    try {
      const response = await axios.post("/api/user/follow", data);
      if (response.status === 204) await mutate();
    } catch (error) {
      Toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const unfollowUser = async ({ idToUnfollow }) => {
    try {
      const response = await axios.delete(`/api/user/follow/${idToUnfollow}`);
      if (response.status === 204) await mutate();
    } catch (error) {
      Toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    error,
    loading,
    setLoading,
    followUser,
    unfollowUser,
  };
};
