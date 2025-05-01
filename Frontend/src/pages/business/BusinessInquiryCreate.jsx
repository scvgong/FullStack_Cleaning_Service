// src/pages/business/InquiryCreate.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInquiry } from "../../api/businessApi";

export default function InquiryCreate() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!subject || !message) {
      setError("제목과 내용을 모두 입력하세요.");
      return;
    }
    try {
      await createInquiry(subject, message);
      navigate("/business/inquiries");
    } catch (err) {
      setError("문의 등록 실패: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">새 문의 작성</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">제목</label>
          <input
            className="w-full p-2 border rounded"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">내용</label>
          <textarea
            className="w-full p-2 border rounded h-32"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          등록하기
        </button>
      </form>
    </div>
  );
}
