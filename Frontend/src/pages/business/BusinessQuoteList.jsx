import { useEffect, useState } from "react";
import { getBusinessQuotes } from "../../api/businessApi";

const BusinessQuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const token = localStorage.getItem("businessToken");

  useEffect(() => {
    if (!token) return;
    getBusinessQuotes(token).then(setQuotes).catch(console.error);
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">견적 요청 목록</h2>
      {quotes.length === 0 ? (
        <p>조회된 요청이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {quotes.map((q) => (
            <li key={q.id} className="border p-4 rounded">
              <p>
                <strong>서비스:</strong> {q.serviceType}
              </p>
              <p>
                <strong>면적:</strong> {q.area} m²
              </p>
              <p>
                <strong>고객명:</strong> {q.name}
              </p>
              <p>
                <strong>연락처:</strong> {q.phone}
              </p>
              <div className="mt-2">
                <strong>이미지:</strong>
                <div className="flex space-x-2 mt-1">
                  {q.images.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-24 h-24 object-cover"
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusinessQuoteList;
