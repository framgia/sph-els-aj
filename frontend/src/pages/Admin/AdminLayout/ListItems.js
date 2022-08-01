import {
  People,
  Layers,
  FormatListNumbered,
  Logout,
} from "@mui/icons-material";

export const MainListItems = [
  {
    text: "User List",
    icon: <People />,
    path: "/admin/users",
  },
  {
    text: "Manage Categories",
    icon: <Layers />,
    path: "/admin/categories",
  },
  {
    text: "Manage Questions",
    icon: <FormatListNumbered />,
    path: "/admin/questions",
  },
];

export const SecondaryListItems = {
  text: "Logout",
  icon: <Logout />,
};
