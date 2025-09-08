// src/pages/member/MemberRegister.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerMember } from "../../api/memberApi";

const MemberRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", name: "", phone: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.password || !form.name || !form.phone) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    try {
      await registerMember(form);
      alert("회원가입이 완료되었습니다. 로그인 해주세요!");
      navigate("/member/login");
    } catch (err) {
      console.error(err);
      setError("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" name="username" placeholder="아이디" value={form.username} onChange={onChange}/>
        <input className="w-full border px-3 py-2 rounded" type="password" name="password" placeholder="비밀번호" value={form.password} onChange={onChange}/>
        <input className="w-full border px-3 py-2 rounded" name="name" placeholder="이름" value={form.name} onChange={onChange}/>
        <input className="w-full border px-3 py-2 rounded" name="phone" placeholder="연락처 (예: 010-1234-5678)" value={form.phone} onChange={onChange}/>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">가입하기</button>
        <Link to="/member/login" className="block text-center text-sm text-gray-600 hover:underline">
          이미 계정이 있으신가요? 로그인
        </Link>
      </form>
    </div>
  );
}

export default MemberRegister;