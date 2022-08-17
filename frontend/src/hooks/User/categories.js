import { useState } from "react";
import useSWR from "swr";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import axios from "../../lib/axios";

export const useUserCategories = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: categories, error } = useSWR(
    "/api/user/category",
    () =>
      axios
        .get("/api/user/category")
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

  const takeLesson = ({ id, title, is_taken }) => {
    if (is_taken) {
      Swal.fire({
        title: "Oppps..",
        text: "You cannot re-take this lesson!",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to retake this lesson!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I will proceed",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/categories/lesson", { state: { id: id, title: title } });
        }
      });
    }
  };

  return {
    categories,
    error,
    loading,
    setLoading,
    takeLesson,
  };
};
