import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BusinessDashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // 예시: 토큰에서 username을 꺼내거나, API로 프로필 정보를 가져올 수 있습니다.
    const token = localStorage.getItem("businessToken");
    if (token) {
      // decodeToken은 직접 구현하신 JWT 유틸을 호출하거나
      // 간단히 payload를 Base64로 디코딩해 username 필드를 뽑아도 되고요.
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.sub);
      } catch {
        setUsername("사업자님");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">사업자 대시보드</h1>
        <button
          className="text-sm text-red-600 hover:underline"
          onClick={() => {
            localStorage.removeItem("businessToken");
            window.location.href = "/auth/login";
          }}
        >
          로그아웃
        </button>
      </header>

      <section className="bg-white shadow rounded p-6">
        <p className="mb-4 text-lg">
          환영합니다, <span className="font-medium">{username}</span> 님!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/business/quotes"
            className="block p-4 bg-blue-100 rounded hover:bg-blue-200"
          >
            견적 요청 목록 보기
          </Link>
          <Link
            to="/business/profile"
            className="block p-4 bg-green-100 rounded hover:bg-green-200"
          >
            내 정보 관리
          </Link>
          <Link
            to="/business/inquiries"
            className="block p-4 bg-yellow-100 rounded hover:bg-yellow-200"
          >
            관리자에게 문의
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BusinessDashboard;
