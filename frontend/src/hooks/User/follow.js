import axios from "../../lib/axios";
import { Toast } from "../../utils/GeneralFunctions";

export const useFollow = (setLoading, mutate) => {
  const followUser = async (data) => {
    try {
      const response = await axios.post("/api/user/follow", data);
      if (response.status === 204) {
        await mutate();
      }
    } catch (error) {
      Toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const unfollowUser = async ({ idToUnfollow }) => {
    try {
      const response = await axios.delete(`/api/user/follow/${idToUnfollow}`);
      if (response.status === 204) {
        await mutate();
      }
    } catch (error) {
      Toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    followUser,
    unfollowUser,
  };
};
