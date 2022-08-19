import { styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MuiPaper from "@mui/material/Paper";

export const useStyles = makeStyles({
  secondaryListSpan: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  yourAnswer: {
    display: "inline",
    marginRight: "5px",
    fontWeight: "bold",
  },
  answer: {
    display: "inline",
    marginRight: "5px",
  },
  boxTopicsList: {
    height: 400,
    maxHeight: 400,
    overflow: "auto",
  },
});

export const TopicsPaper = styled(MuiPaper)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  paddingTop: "20px",
  paddingBottom: "10px",
});
