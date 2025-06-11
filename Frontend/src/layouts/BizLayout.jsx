import { Outlet, useLocation } from "react-router-dom";
import BizHeader from "../components/BizHeader";

export default function BizLayout() {
  const location = useLocation();

  //헤더 레이아웃 숨길 경로
  const hiddenLayoutPaths = ["/business/login", "/business/register"];
  const isLayoutHidden = hiddenLayoutPaths.includes(location.pathname);

  if(isLayoutHidden){
    return <Outlet />;
  }

  return (
    <>
      <BizHeader /> {/* 사업자 전용 Nav */}
      <main className="biz-container">
        <Outlet />
      </main>
    </>
  );
}
