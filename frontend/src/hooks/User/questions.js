import { useState } from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "../../lib/axios";
import { Toast } from "../../utils/GeneralFunctions";
import { useUserCategories } from "./categories";

export const useUserQuestions = (categoryId) => {
  const [loading, setLoading] = useState(false);
  const { mutate: categoryMutate } = useUserCategories();
  const navigate = useNavigate();

  const {
    data: questions,
    error,
    mutate,
  } = useSWR(
    categoryId ? `/api/user/category/${categoryId}/lesson` : null,
    () =>
      axios
        .get(`/api/user/category/${categoryId}/lesson`)
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

  const submitAnswer = async ({ data, category }) => {
    const { id, title } = category;
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/user/category/${categoryId}/lesson`,
        data
      );
      if (response.status === 204) {
        await categoryMutate();
        navigate("/categories/lesson/result", {
          state: { id: id, title: title },
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        Swal.fire({
          title: "Oppps..",
          text: "Looks like you missed some questions. Please check again.",
          icon: "warning",
        });
      } else {
        Toast(error.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    questions,
    error,
    mutate,
    loading,
    setLoading,
    submitAnswer,
  };
};
