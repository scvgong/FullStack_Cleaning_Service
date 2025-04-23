// src/pages/admin/FaqList.jsx
import { useEffect, useState } from "react";
import { fetchFaqs } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) return;
    fetchFaqs(token).then(setFaqs).catch(console.error);
  }, [token]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">FAQ 목록</h2>
        <button
          onClick={() => navigate("/admin/faqs/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          작성
        </button>
      </div>
      {faqs.length === 0 ? (
        <p>등록된 FAQ가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {faqs.map((f) => (
            <li key={f.id} className="border p-4 rounded hover:bg-gray-50">
              <p className="font-medium">{f.question}</p>
              <p className="text-gray-700 mt-1">{f.answer}</p>
              <p className="text-xs text-gray-500 mt-2">
                등록일: {new Date(f.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FaqList;
