import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/adminApi";
import { Link } from "react-router-dom";
import { loginBusiness } from "../../api/businessApi";

const AuthLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [role, setRole] = useState("ADMIN"); // ADMIN 또는 BUSINESS

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let token;
      if (role === "ADMIN") {
        token = await loginAdmin(username, password);
        localStorage.setItem("adminToken", token);
        navigate("/admin/dashboard");
      } else {
        token = await loginBusiness(username, password);
        localStorage.setItem("businessToken", token);
        navigate("/business/dashboard");
      }
    } catch (err) {
      console.error(err.response?.status, err.response?.data);
      setError("로그인에 실패했습니다: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-20 border rounded shadow">
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
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {role === "ADMIN" ? "관리자 로그인" : "사업자 로그인"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        {role === "ADMIN" ? (
          <>
            사업자이신가요?{" "}
            <Link to="/admin/register" className="text-blue-600 underline">
              회원가입
            </Link>
          </>
        ) : (
          <>
            관리자이신가요?{" "}
            <Link to="/admin/login" className="text-blue-600 underline">
              관리자 로그인
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthLogin;
