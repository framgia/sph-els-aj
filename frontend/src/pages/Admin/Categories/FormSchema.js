import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().max(255).required(),
  description: yup.string().max(500),
});
