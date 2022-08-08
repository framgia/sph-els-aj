import { Grid } from "@mui/material";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

import OptionRadioButton from "../Options/OptionRadioButton";
import OptionAction from "../Options/OptionAction";
import OptionTextField from "../Options/OptionTextField";

const MAX_LIMIT = 5;
const MINIMUM_LIMIT = 1;
const INITIAL_INDEX = 0;

const Options = ({ getValues, errors, register, loading, control }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: "options",
  });

  const onAddOption = () => {
    if (fields.length !== MAX_LIMIT) {
      append({ value: "", is_correct: false });
    }
  };

  const onRemoveOption = (index, value) => {
    if (fields.length !== MINIMUM_LIMIT) {
      remove(index, value);
      if (selectedAnswer === index) {
        onSetAnswer(null, INITIAL_INDEX);
      }
    }
  };

  const onSetAnswer = (event, selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    getValues("options").forEach((option, index) => {
      update(index, {
        value: getValues(`options.${index}.value`),
        is_correct: selectedIndex === index,
      });
    });
  };

  return (
    <>
      {fields.map(({ id, value, is_correct }, index) => (
        <Grid container key={id}>
          <OptionRadioButton
            value={value}
            is_correct={is_correct}
            handleChange={(e) => onSetAnswer(e, index)}
          />
          <OptionTextField
            index={index}
            errors={errors}
            register={register}
            loading={loading}
            value={value}
          />
          <OptionAction action="add" handleOnClick={onAddOption} />
          <OptionAction
            action="remove"
            handleOnClick={() => onRemoveOption(index, value)}
          />
        </Grid>
      ))}
    </>
  );
};

export default Options;
