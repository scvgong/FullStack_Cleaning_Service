import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminQuoteList() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/quotes")
      .then((res) => setQuotes(res.data))
      .catch((err) => console.error("견적 목록 조회 실패:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">견적 요청 목록</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">이름</th>
            <th className="border p-2">연락처</th>
            <th className="border p-2">서비스</th>
            <th className="border p-2">공간</th>
            <th className="border p-2">요청내용</th>
            <th className="border p-2">작업</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id}>
              <td className="border p-2">{quote.id}</td>
              <td className="border p-2">{quote.name}</td>
              <td className="border p-2">{quote.phone}</td>
              <td className="border p-2">{quote.serviceType}</td>
              <td className="border p-2">{quote.spaceType}</td>
              <td className="border p-2">{quote.message}</td>
              <td className="border p-2">
                <button className="text-blue-500 hover:underline mr-2">
                  상세
                </button>
                <button className="text-red-500 hover:underline">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
