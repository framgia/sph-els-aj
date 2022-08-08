import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useCategories } from "../../../../hooks/categories";

const INITIAL_INDEX = 0;

const CategoryDropdown = ({ getCategory, dataLength }) => {
  const [length, setLength] = useState(0);
  const [label, setLabel] = useState("");
  const [selectDefaultValue, setSelectDefaultValue] = useState("");
  const { categories, isValidating } = useCategories();

  const handleChange = (event) => {
    setSelectDefaultValue(event.target.value);
    getCategory(event.target.value);
  };

  useEffect(() => {
    if (isValidating) {
      setLabel("Loading...");
    } else {
      if (categories.length === 0) {
        setLabel("No data");
      } else {
        setLabel("Categories");
        setSelectDefaultValue(categories[INITIAL_INDEX].id);
        getCategory(categories[INITIAL_INDEX].id);
        setLength(categories.length);
        dataLength(categories.length);
      }
    }
  }, [isValidating]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      sx={{ minWidth: 120 }}
    >
      {isValidating && <CircularProgress sx={{ mr: 2 }} size="1.5rem" />}
      <FormControl sx={{ width: "25%", my: 2 }} disabled={length === 0}>
        <InputLabel id="category-select">{label}</InputLabel>
        <Select
          value={selectDefaultValue}
          label="Categories"
          onChange={handleChange}
        >
          {categories &&
            categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default CategoryDropdown;
