import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

import OptionRadioButton from "../Options/OptionRadioButton";
import OptionAction from "../Options/OptionAction";
import OptionTextField from "../Options/OptionTextField";

const MAX_LIMIT = 5;
const MINIMUM_LIMIT = 1;
const INITIAL_INDEX = 0;

const Options = ({ getValues, errors, register, disabled, control }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: "options",
  });

  useEffect(() => {
    setSelectedAnswer(
      getValues("options").findIndex((option) => option.is_correct)
    );
  }, []);

  const onAddOption = () => {
    if (fields.length !== MAX_LIMIT) {
      append({ id: "", value: "", is_correct: false });
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
        id: getValues(`options.${index}.id`),
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
            is_correct={Boolean(is_correct)}
            handleChange={(e) => onSetAnswer(e, index)}
            disabled={disabled}
          />
          <OptionTextField
            index={index}
            errors={errors}
            register={register}
            disabled={disabled}
            value={value}
          />
          <OptionAction
            action="add"
            disabled={disabled}
            handleOnClick={onAddOption}
          />
          <OptionAction
            action="remove"
            disabled={disabled}
            handleOnClick={() => onRemoveOption(index, value)}
          />
        </Grid>
      ))}
    </>
  );
};

export default Options;
