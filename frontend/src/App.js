import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RequireAuth from "./middlewares/RequireAuth";
import SignUp from "./pages/User/SignUp/SignUp";
import Login from "./pages/User/Login/Login";
import UserDashboard from "./pages/User/Dashboard/UserDashboard";
import Unauthorized from "./pages/Unauthorized";
import Users from "./pages/Admin/Users/Users";
import Categories from "./pages/Admin/Categories/Categories";
import UserCategories from "./pages/User/Categories/Categories";
import Questions from "./pages/Admin/Questions/Questions";
import UserList from "./pages/User/UserList/UserList";
import { Roles } from "./utils/RoleConstants";
import Lesson from "./pages/User/Lessons/Lesson";
import Result from "./pages/User/Lessons/Results/Results";
import AuthProfile from "./pages/User/AuthProfile/AuthProfile";
import UserProfile from "./pages/User/UserProfile/UserProfile";
import Settings from "./pages/User/Settings/Settings";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<RequireAuth role={Roles.USER} />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/categories" element={<UserCategories />} />
            <Route path="/categories/lesson" element={<Lesson />} />
            <Route path="/categories/lesson/result" element={<Result />} />
            <Route path="/users/profile/:id" element={<UserProfile />} />
            <Route path="/profile" element={<AuthProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route element={<RequireAuth role={Roles.ADMIN} />}>
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/questions" element={<Questions />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
