// src/components/BizHeader.jsx    (사업자용)
import { Link, useNavigate } from "react-router-dom";
export default function BizHeader() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("businessToken");
    navigate("/business/login");
  };
  return (
    <header className="p-4 bg-gray-100 flex space-x-4">
      <Link to="/business/dashboard">대시보드</Link>
      <Link to="/business/quotes">견적목록</Link>
      <button onClick={logout} className="ml-auto text-red-500">
        로그아웃
      </button>
    </header>
  );
}
