import { useEffect, useState } from "react";
import { fetchAllInquiries } from "../../api/adminApi";
import { Link, useNavigate } from "react-router-dom";

export default function AdminInquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  console.log('inquiries', inquiries);

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
      <div>
        <Link to="/admin/inquiries/completed" className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          답변 완료된 문의 보기
          </Link>
      </div>
    </div>
  )
}
