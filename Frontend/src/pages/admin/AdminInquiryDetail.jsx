// src/pages/admin/InquiryDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchInquiryAdminDetail, createInquiryReply } from "../../api/adminApi";

export default function AdminInquiryDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiryAdminDetail(id).then(d => {
      setData(d);
      setAnswer(d.reply || "");
    });
  }, [id]);

  if (!data) return <p>로딩 중...</p>;

  const handleSubmit = async e => {
    e.preventDefault();
    await createInquiryReply(id, answer);
    navigate(-1);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">{data.subject}</h2>
      <p className="mb-4 whitespace-pre-wrap">{data.message}</p>
      <p className="mb-2 text-gray-600">사업자: {data.businessName}</p>
      {data.reply && ( 
        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-1">기존 답변:</p>
          <div className="p-4 bg-blue-50 rounded whitespace-pre-wrap">
            {data.reply}
          </div>
        </div>)}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded h-32"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="답변 내용을 입력하세요"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          답변 등록
        </button>
      </form>
      <button onClick={() => navigate(-1)} className="mt-4 text-gray-600 hover:underline">
        돌아가기
      </button>
    </div>
  )
}
