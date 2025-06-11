import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!form.username || !form.password || !form.confirmPassword || !form.name) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/admin/users", {
        username: form.username,
        password: form.password,
        name: form.name,
      });

      setSuccess(response.data); // 예: "가입 신청 완료. 승인 대기 중입니다."
      setForm({ username: "", password: "", confirmPassword: "", name: "" });

      // 2초 후 로그인 페이지로 이동
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data || "회원가입 요청 중 오류가 발생했습니다."
      );
    }

    // TODO: 백엔드 API 연동 예정
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">관리자 계정 등록</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          관리자 등록
        </button>

        {/* 로그인 페이지 돌아가기 */}
         <button
          type="button"
          onClick={() => navigate("/admin/login")}
          className="w-full mt-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
        >
          로그인으로 돌아가기
        </button>
      </form>
    </div>
  );
}

export default AdminRegister;