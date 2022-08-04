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

const CategoryDropdown = ({ getCategory }) => {
  const [data, setData] = useState("");
  const [length, setLength] = useState(0);
  const [label, setLabel] = useState("");
  const { categories, isValidating } = useCategories();

  const handleChange = (event) => {
    setData(event.target.value);
    getCategory(event.target.value);
  };

  useEffect(() => {
    if (categories) {
      setLength(categories.length);
      setLabel("Category");
    }
  }, [categories]);

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
          labelId="category-select"
          value={data}
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
