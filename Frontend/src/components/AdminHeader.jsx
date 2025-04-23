import { Link, useNavigate } from "react-router-dom";
export default function AdminHeader() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  return (
    <header className="p-4 bg-gray-100 flex space-x-4">
      <Link to="/admin/dashboard">대시보드</Link>
      <Link to="/admin/faqs">FAQ 작성</Link>
      <Link to="/admin/quotes">견적관리</Link>
      <button onClick={logout} className="ml-auto text-red-500">
        로그아웃
      </button>
    </header>
  );
}
