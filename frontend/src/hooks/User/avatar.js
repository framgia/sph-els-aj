import { useState } from "react";
import Swal from "sweetalert2";
import { useSWRConfig } from "swr";

import axios from "../../lib/axios";
import { Toast } from "../../utils/GeneralFunctions";

const FILE_TYPES = {
  "image/jpeg": true,
  "image/jpg": true,
  "image/png": true,
};

const useAvatar = () => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const handleAvatar = (event) => {
    const { files } = event.target;
    if (files.length !== 0 && (FILE_TYPES[files[0].type] ?? false)) {
      uploadAvatar(files[0]);
    } else {
      Swal.fire({
        title: "Error Encountered!",
        text: "Invalid file selected! Please select another file.",
        icon: "warning",
      });
      event.target.value = null;
    }
  };

  const uploadAvatar = async (file) => {
    const form = new FormData();
    form.append("avatar", file);
    form.append("_method", "PUT");

    try {
      const response = await axios.post("/api/user/change-avatar", form);
      if (response.status === 204) {
        await mutate("/api/auth");
        Toast("Avatar Successfully updated!", "success");
      }
    } catch (error) {
      Toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAvatar,
    loading,
    setLoading,
  };
};

export default useAvatar;
