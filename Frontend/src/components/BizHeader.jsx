// src/components/BizHeader.jsx    (사업자용)
import { Link, useNavigate } from "react-router-dom";
export default function BizHeader() {
  const logout = () => {
    localStorage.removeItem("businessToken");
    navigate("/admin/login");
  };
  return (
    <header>
      <Link to="/business/dashboard">대시보드</Link>
      <Link to="/business/quotes">견적목록</Link>
      <button onClick={logout}>로그아웃</button>
    </header>
  );
}
