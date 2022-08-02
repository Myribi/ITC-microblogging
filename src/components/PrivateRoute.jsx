import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function PrivateRoute(props) {
  const { children } = props;
  const { userId} = useContext(UserContext);
  return (!userId ? <Navigate to="/login" /> : children)
}
