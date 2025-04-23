import { Link, useNavigate } from "react-router-dom";
export default function AdminHeader() {
  const logout = () => {
    /* 토큰 삭제 후 리다이렉트 */
  };
  return (
    <header>
      <Link to="/admin/faqs/create">FAQ 작성</Link>
      <Link to="/admin/quotes">견적관리</Link>
      <button onClick={logout}>로그아웃</button>
    </header>
  );
}
