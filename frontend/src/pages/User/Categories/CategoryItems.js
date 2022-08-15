import {
  Button,
  CardActions,
  CardContent,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import MuiCard from "@mui/material/Card";

const Card = styled(MuiCard)({
  height: "100%",
  justifyContent: "space-between",
  maxWidth: 345,
  display: "flex",
  flexDirection: "column",
});

const CategoryItems = ({ categories, takeLesson }) => {
  return (
    <>
      {categories &&
        categories.map(({ id, title, description, is_taken }) => (
          <Grid key={id} item xs={12} sm={4} md={4}>
            <Card>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ wordWrap: "break-word" }}
                >
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container justifyContent="right">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => takeLesson({ id, title, is_taken })}
                  >
                    START
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </>
  );
};

export default CategoryItems;
