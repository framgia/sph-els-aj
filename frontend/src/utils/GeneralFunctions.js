import { useEffect } from "react";

import { toast } from "react-toastify";

export const TabTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

export const Toast = (message, type) => {
  toast(message, {
    position: "top-right",
    type: type,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "colored",
    pauseOnHover: true,
    progress: undefined,
  });
};
