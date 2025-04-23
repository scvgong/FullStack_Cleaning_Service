import { Link, useNavigate } from "react-router-dom";
export default function AdminHeader() {
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  return (
    <header>
      <Link to="/admin/dashboard">대시보드</Link>
      <Link to="/admin/faqs/create">FAQ 작성</Link>
      <Link to="/admin/quotes">견적관리</Link>
      <button onClick={logout}>로그아웃</button>
    </header>
  );
}
