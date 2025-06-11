import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  const location = useLocation();

  //헤더.레이아웃 숨길 경로
  const hiddenLayoutPaths = ["/admin/login", "/admin/register"];
  const isLayoutHidden = hiddenLayoutPaths.includes(location.pathname);

  if(isLayoutHidden){
    return <Outlet />;
  }

  return (
    <>
      <AdminHeader /> {/* 관리자 전용 Nav */}
      <main className="admin-container">
        <Outlet />
      </main>
    </>
  );
}
