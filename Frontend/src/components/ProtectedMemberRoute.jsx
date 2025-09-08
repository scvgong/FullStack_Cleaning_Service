// src/components/ProtectedMemberRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedMemberRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("memberToken");

  if (!token) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/member/login?next=${redirect}`} replace />;
  }
  return children;
}
