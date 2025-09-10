import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginAdmin } from "../../api/adminApi";
import { loginBusiness } from "../../api/businessApi";
import { loginMember } from "../../api/memberApi";

const AuthLogin = () => {
  const [role, setRole] = useState("ADMIN"); // ADMIN | BUSINESS | MEMBER
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 다른 역할 토큰 정리(권장)
      ["adminToken", "businessToken", "memberToken"].forEach((k) =>
        localStorage.removeItem(k)
      );

      let token = "";
      if (role === "ADMIN") {
        token = await loginAdmin(username, password);
        localStorage.setItem("adminToken", token);
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "BUSINESS") {
        token = await loginBusiness(username, password);
        localStorage.setItem("businessToken", token);
        navigate("/business/dashboard", { replace: true });
      } else {
        token = await loginMember(username, password);
        localStorage.setItem("memberToken", token);
        // 보호 라우트에서 온 경우 next로 복귀, 아니면 홈/원하는 페이지
        navigate(next || "/", { replace: true });
      }
    } catch (err) {
      console.error(err?.response?.status, err?.response?.data);
      setError("로그인에 실패했습니다: " + (err?.response?.data || err.message));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-20 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

      {/* 역할 선택 */}
      <div className="flex justify-center mb-6 space-x-6">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="role"
            value="ADMIN"
            checked={role === "ADMIN"}
            onChange={() => setRole("ADMIN")}
            className="form-radio"
          />
          <span className="ml-2">관리자</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="role"
            value="BUSINESS"
            checked={role === "BUSINESS"}
            onChange={() => setRole("BUSINESS")}
            className="form-radio"
          />
          <span className="ml-2">사업자</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="role"
            value="MEMBER"
            checked={role === "MEMBER"}
            onChange={() => setRole("MEMBER")}
            className="form-radio"
          />
          <span className="ml-2">회원</span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="block w-full p-2 border rounded"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="block w-full p-2 border rounded"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className={`w-full py-2 text-white rounded ${
            role === "ADMIN"
              ? "bg-blue-600 hover:bg-blue-700"
              : role === "BUSINESS"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {role === "ADMIN"
            ? "관리자 로그인"
            : role === "BUSINESS"
            ? "사업자 로그인"
            : "회원 로그인"}
        </button>
      </form>

      {/* 역할별 회원가입 링크 */}
      <p className="mt-4 text-center text-sm">
        {role === "ADMIN" && (
          <>
            관리자 이신가요?{" "}
            <Link to="/admin/register" className="text-blue-600 underline">
              회원가입
            </Link>
          </>
        )}
        {role === "BUSINESS" && (
          <>
            사업자 이신가요?{" "}
            <Link to="/business/register" className="text-blue-600 underline">
              사업자 회원가입
            </Link>
          </>
        )}
        {role === "MEMBER" && (
          <>
            아직 회원이 아니신가요?{" "}
            <Link to="/member/register" className="text-blue-600 underline">
              회원가입
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthLogin;
