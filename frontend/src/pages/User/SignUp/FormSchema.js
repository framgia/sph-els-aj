import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().max(255).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(8).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});
