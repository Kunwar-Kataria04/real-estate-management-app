import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); 
  return user ? <Navigate to="/home" /> : children;
};

export default PublicOnlyRoute;
