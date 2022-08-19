import useSWR from "swr";

import axios from "../../lib/axios";

export const useFollowingAndFollower = (url) => {
  const fetcher = (...args) => axios(...args).then((res) => res.data);
  const options = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
  };

  const { data, error } = useSWR(url, fetcher, options);

  return {
    data,
    isLoading: !error && !data,
  };
};
