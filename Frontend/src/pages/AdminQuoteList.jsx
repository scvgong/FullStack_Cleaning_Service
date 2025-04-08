import { useEffect, useState } from "react";

const AdminQuoteList = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch((err) => console.error("데이터 불러오기 실패:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">견적 요청 리스트</h2>
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">서비스 유형</th>
              <th className="border px-4 py-2">공간 유형</th>
              <th className="border px-4 py-2">이름</th>
              <th className="border px-4 py-2">연락처</th>
              <th className="border px-4 py-2">이메일</th>
              <th className="border px-4 py-2">메시지</th>
              <th className="border px-4 py-2">이미지</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id}>
                <td className="border px-4 py-2">{quote.id}</td>
                <td className="border px-4 py-2">{quote.serviceType}</td>
                <td className="border px-4 py-2">{quote.spaceType}</td>
                <td className="border px-4 py-2">{quote.name}</td>
                <td className="border px-4 py-2">{quote.phone}</td>
                <td className="border px-4 py-2">{quote.email}</td>
                <td className="border px-4 py-2">{quote.message}</td>
                <td className="border px-4 py-2">
                  {quote.imagePaths?.map((path, index) => (
                    <a
                      key={index}
                      href={`http://localhost:8080/uploads/${path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline block"
                    >
                      이미지 {index + 1}
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuoteList;
