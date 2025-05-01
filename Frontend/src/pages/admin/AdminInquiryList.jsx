import { useEffect, useState } from "react";
import { fetchAllInquiries } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

export default function AdminInquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllInquiries()
      .then(setInquiries)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">전체 문의 목록</h2>
      <ul className="space-y-3">
        {inquiries.map(q => (
          <li key={q.id} className="border p-4 rounded hover:bg-gray-50 flex justify-between items-center">
            <div>
              <p className="font-medium">[{q.businessName}] {q.subject}</p>
              <p className="text-sm text-gray-600">{q.status} · {new Date(q.createdAt).toLocaleString()}</p>
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
    </div>
  )
}
