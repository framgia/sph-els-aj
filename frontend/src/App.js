import SignUp from "./pages/User/SignUp/SignUp";
import Login from "./pages/User/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
