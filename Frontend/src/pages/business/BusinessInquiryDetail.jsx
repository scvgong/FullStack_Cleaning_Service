// src/pages/business/InquiryDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchInquiryDetail } from "../../api/businessApi";

export default function BusinessInquiryDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiryDetail(id)
      .then(setData)
      .catch(console.error);
  }, [id]);

  if (!data) return <p>로딩 중...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">{data.subject}</h2>
      <p className="mb-4 whitespace-pre-wrap">{data.message}</p>
      <p className="mb-2 text-gray-600">상태: {data.status}</p>
      {data.reply ? (
        <>
          <h3 className="font-medium mt-4">답변</h3>
          <p className="whitespace-pre-wrap">{data.reply}</p>
          <p className="text-sm text-gray-500 mt-2">{new Date(data.repliedAt).toLocaleString()}</p>
        </>
      ) : (
        <p className="text-gray-500">아직 답변이 없습니다.</p>
      )}
      <button onClick={() => navigate(-1)} className="mt-6 text-blue-600 hover:underline">
        돌아가기
      </button>
    </div>
  );
}
