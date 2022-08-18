import { useState } from "react";
import { useSWRConfig } from "swr";

import axios from "../../lib/axios";
import { Toast } from "../../utils/GeneralFunctions";

export const useSettings = () => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const updateUserBasicDetails = async (data, setError) => {
    try {
      const response = await axios.put(`api/user/profile/${data.id}`, data);
      if (response.status === 204) {
        await mutate("/api/auth");
        Toast("Information has been updated!", "success");
      }
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };
  const changeUserPassword = async (data, setError, reset) => {
    try {
      const response = await axios.put("api/user/change-password", data);
      if (response.status === 204) {
        Toast("Information has been updated!", "success");
        reset();
      }
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  const catchErrors = (error, setError) => {
    if (error.response.status !== 422) {
      Toast(error.message, "error");
      throw error;
    }
    let entries = Object.entries(error.response.data.errors);
    entries.forEach(function (item) {
      setError(item[0], { type: "custom", message: item[1][0] });
    });
  };

  return {
    loading,
    setLoading,
    updateUserBasicDetails,
    changeUserPassword,
  };
};
