import SignUp from "./pages/User/SignUp/SignUp";
import Login from "./pages/User/Login/Login";
import UserDashboard from "./pages/User/UserDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./middlewares/RequireAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<RequireAuth role={2} />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<RequireAuth role={1} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
