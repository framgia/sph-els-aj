import { useAuth } from "../../hooks/auth";

const UserDashboard = () => {
  const { user, logout } = useAuth({ middleware: "auth" });
  return (
    <>
      <h1>
        {`You are logged in as an User. `}
        {user && user.name}
      </h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default UserDashboard;
