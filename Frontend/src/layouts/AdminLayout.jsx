import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader /> {/* 관리자 전용 Nav */}
      <main className="admin-container">
        <Outlet />
      </main>
    </>
  );
}
