import * as yup from "yup";

const REQUIRED_FIELD = "The option is a required field";

export const schema = yup.object().shape({
  value: yup.string().max(255).required(),
  options: yup.array(
    yup.object({
      value: yup.string().required(REQUIRED_FIELD),
      is_correct: yup.boolean(),
    })
  ),
});
