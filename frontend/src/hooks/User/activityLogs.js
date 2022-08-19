import useSWR from "swr";

import axios from "../../lib/axios";

export const useActivityLogs = () => {
  const fetcher = (...args) => axios(...args).then((res) => res.data);
  const options = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
  };

  const { data, error } = useSWR("/api/user/activity-logs", fetcher, options);

  return {
    activityLogs: data,
    isLoading: !error && !data,
  };
};
