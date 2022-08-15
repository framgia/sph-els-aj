import {
  Box,
  CircularProgress,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";

import UserLayout from "../UserLayout/UserLayout";
import { useUserCategories } from "../../../hooks/User/categories";
import { TabTitle } from "../../../utils/GeneralFunctions";
import CategoryItems from "./CategoryItems";

const LoaderBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
  height: "50vh",
});

const Categories = () => {
  TabTitle("E-Learning System | Categories");

  const { categories, takeLesson } = useUserCategories();

  return (
    <UserLayout>
      <Container maxWidth="lg">
        {!categories ? (
          <LoaderBox>
            <CircularProgress />
          </LoaderBox>
        ) : (
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ wordWrap: "break-word" }}
          >
            Categories
          </Typography>
        )}
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          mt={2}
          spacing={2}
        >
          <CategoryItems categories={categories} takeLesson={takeLesson} />
        </Grid>
      </Container>
    </UserLayout>
  );
};

export default Categories;
