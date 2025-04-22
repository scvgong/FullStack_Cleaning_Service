import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBusinessQuoteById } from "../../api/businessApi";

const BusinessQuoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("businessToken");
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (!token) return navigate("/login");
    getBusinessQuoteById(token, id)
      .then(setQuote)
      .catch(() => alert("불러오기 실패"));
  }, [token, id, navigate]);

  if (!quote) return <p>로딩 중…</p>;

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">
        ← 목록으로
      </button>
      <h2 className="text-2xl font-bold mb-2">견적 상세</h2>
      <p>
        <strong>서비스 유형:</strong> {quote.serviceType}
      </p>
      <p>
        <strong>공간 유형:</strong> {quote.spaceType}
      </p>
      <p>
        <strong>면적:</strong> {quote.area} m²
      </p>
      <p>
        <strong>이름:</strong> {quote.name}
      </p>
      <p>
        <strong>연락처:</strong> {quote.phone}
      </p>
      <p>
        <strong>이메일:</strong> {quote.email}
      </p>
      <p>
        <strong>위치:</strong> {quote.location}
      </p>
      <p>
        <strong>메시지:</strong> {quote.message}
      </p>
      <div className="mt-4">
        <strong>이미지:</strong>
        <div className="flex flex-wrap gap-2 mt-1">
          {quote.images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`견적 이미지 ${i + 1}`}
              className="w-32 h-32 object-cover rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessQuoteDetail;
