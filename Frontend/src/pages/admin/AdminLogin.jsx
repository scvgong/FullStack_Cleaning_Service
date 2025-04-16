import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/adminApi";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginAdmin(username, password);
      localStorage.setItem("adminToken", token);
      navigate("/admin/quotes");
    } catch (err) {
      alert("로그인 실패");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-20 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">관리자 로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="block w-full p-2 mb-3 border"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="block w-full p-2 mb-3 border"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          로그인
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        사업자이신가요?{" "}
        <Link to="/admin/register" className="text-blue-600 underline">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default AdminLogin;
