// src/pages/admin/InquiryCompletedList.jsx
import { useEffect, useState } from "react";
import { fetchCompletedInquiries } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

export default function InquiryCompletedList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompletedInquiries()
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">답변 완료된 문의</h2>
      {items.length === 0 ? (
        <p>답변 완료된 문의가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {items.map(q => (
            <li key={q.id}
                className="border p-4 rounded hover:bg-gray-50 flex justify-between items-start">
              <div>
                <p className="font-medium">
                  [{q.businessName}] {q.subject}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  상태: {q.status} · {new Date(q.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-700 whitespace-pre-wrap">
                  <strong>답변:</strong> {q.reply}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ({new Date(q.repliedAt).toLocaleString()})
                </p>
              </div>
              <button
                onClick={() => navigate(`/admin/inquiries/${q.id}`)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                상세
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
