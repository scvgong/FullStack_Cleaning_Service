import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AdminQuoteDetail() {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/quotes/${id}`)
      .then((res) => setQuote(res.data))
      .catch((err) => console.error("상세 정보 불러오기 실패:", err));
  }, [id]);

  if (!quote) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 견적 상세 정보</h2>
      <p>
        <strong>이름:</strong> {quote.name}
      </p>
      <p>
        <strong>서비스 유형:</strong> {quote.serviceType}
      </p>
      <p>
        <strong>공간 유형:</strong> {quote.spaceType}
      </p>
      <p>
        <strong>면적:</strong> {quote.area}
      </p>
      <p>
        <strong>전화번호:</strong> {quote.phone}
      </p>
      <p>
        <strong>이메일:</strong> {quote.email}
      </p>
      <p>
        <strong>주소:</strong> {quote.location}
      </p>
      <p>
        <strong>요청 메시지:</strong> {quote.message}
      </p>
      <p>
        <strong>신청일:</strong> {quote.createdAt || "미정"}
      </p>

      <h3>첨부 이미지</h3>
      {quote.images && quote.images.length > 0 ? (
        quote.images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:8080/uploads/${img.filePath}`}
            alt={`견적 이미지 ${index + 1}`}
            style={{ width: "300px", margin: "10px" }}
          />
        ))
      ) : (
        <p>첨부된 이미지가 없습니다.</p>
      )}
    </div>
  );
}
