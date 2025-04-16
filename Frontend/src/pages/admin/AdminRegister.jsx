import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    role: "BUSINESS",
    category: "",
    phone: "",
    mobile: "",
    businessNo: "",
  });

  const [certFile, setCertFile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCertFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.phone && !form.mobile) {
      setError("연락처 또는 휴대폰 번호 중 하나는 입력해야 합니다.");
      return;
    }

    if (!form.businessNo.match(/^\d+$/)) {
      setError("사업자 번호는 숫자만 입력 가능합니다.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(form)], { type: "application/json" })
    );
    if (certFile) {
      formData.append("certFile", certFile);
    }
    try {
      await axios.post(
        "http://localhost:8080/api/business/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("회원가입이 완료되었습니다!");
      navigate("/admin/login");
    } catch (err) {
      console.error(err);
      setError("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">사업자 회원가입</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="name"
          placeholder="이름/상호명"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="businessNo"
          placeholder="사업자 번호 (숫자만)"
          value={form.businessNo}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <div>
          <label className="block mb-1 text-sm font-medium">
            사업자 등록증 업로드
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>
        <input
          name="phone"
          placeholder="사업장 연락처 (예: 02-1234-5678)"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="mobile"
          placeholder="휴대폰 번호 (예: 010-1234-5678)"
          value={form.mobile}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">서비스 유형 선택</option>
          <option value="입주청소">입주청소</option>
          <option value="인테리어청소">인테리어청소</option>
          <option value="준공청소">준공청소</option>
          <option value="카펫청소">카펫청소</option>
          <option value="외벽청소">외벽청소</option>
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
