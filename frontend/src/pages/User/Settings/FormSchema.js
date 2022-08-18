import * as yup from "yup";

export const BasicDetailsSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  email: yup.string().email().required(),
});

export const PasswordSchema = yup.object().shape({
  currentPassword: yup.string().min(8).required().label("The Current Password"),
  newPassword: yup.string().min(8).required().label("The New Password"),
  newConfirmedPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "The Confirm New Password and New Password must match."
    ),
});
