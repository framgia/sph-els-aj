import useSWR from "swr";

import axios from "../../lib/axios";

export const useProfile = (id) => {
  const fetcher = (...args) => axios(...args).then((res) => res.data);
  const options = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
  };

  const { data, error, mutate } = useSWR(`/api/user/profile/${id}`, fetcher, options);

  return {
    user: data,
    mutate,
    isLoading: !error && !data,
  };
};
