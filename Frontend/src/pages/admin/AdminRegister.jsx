import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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
    console.log("전송할 데이터:", {
      username: form.username,
      password: form.password,
      name: form.name,
    });

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