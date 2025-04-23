import { Outlet } from "react-router-dom";
import BizHeader from "../components/BizHeader";

export default function BizLayout() {
  return (
    <>
      <BizHeader /> {/* 사업자 전용 Nav */}
      <main className="biz-container">
        <Outlet />
      </main>
    </>
  );
}
