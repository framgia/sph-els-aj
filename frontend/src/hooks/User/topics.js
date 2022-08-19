import useSWR from "swr";

import axios from "../../lib/axios";

export const useTopics = () => {
  const fetcher = (...args) => axios(...args).then((res) => res.data);
  const options = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
  };

  const { data, error } = useSWR("/api/user/topics-learned", fetcher, options);

  return {
    topics: data,
    isLoading: !error && !data,
  };
};
