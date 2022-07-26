import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;
