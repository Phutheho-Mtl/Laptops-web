
import { Navigate } from "react-router-dom";
import useUser from "./Auth_context";

const ProtectedRoute = ({ children }) => {
  const user = useUser();

  // still loading?
  if (user === null) return <p>Checking login...</p>;

  // no user? kick out
  if (!user) return <Navigate to="/login" replace />;

  // all good
  return children;
};

export default ProtectedRoute;
