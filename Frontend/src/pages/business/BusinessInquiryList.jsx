import { useEffect, useState } from "react";
import { fetchMyInquiries } from "../../api/businessApi";
import { useNavigate } from "react-router-dom";

export default function BusinessInquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyInquiries()
      .then(setInquiries)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">내 문의 목록</h2>
      <div>
        <button
          onClick={() => navigate("/business/inquiries/create")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          새 문의 작성
        </button>
      </div>
      <ul className="space-y-3">
        {inquiries.map(q => (
          <li key={q.id} className="border p-4 rounded hover:bg-gray-50">
            <div className="flex justify-between">
              <p className="font-medium">{q.subject}</p>
              <span className="text-sm text-gray-600">{q.status}</span>
            </div>
            <button
              onClick={() => navigate(`/business/inquiries/${q.id}`)}
              className="mt-2 text-blue-600 hover:underline"
            >
              상세보기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}