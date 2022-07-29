import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RequireAuth from "./middlewares/RequireAuth";
import SignUp from "./pages/User/SignUp/SignUp";
import Login from "./pages/User/Login/Login";
import UserDashboard from "./pages/User/UserDashboard";
import Unauthorized from "./pages/Unauthorized";
import Users from "./pages/Admin/Users";
import Categories from "./pages/Admin/Categories";
import Questions from "./pages/Admin/Questions";
import { Roles } from "./utils/RoleConstants";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth role={Roles.USER} />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>

        <Route element={<RequireAuth role={Roles.ADMIN} />}>
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/questions" element={<Questions />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
