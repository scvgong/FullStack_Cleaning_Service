import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminQuoteList() {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  //페이징 처리
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10; // 페이지당 항목 수

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/admin/quotes?page=${page}&size=${pageSize}`
      )
      .then((res) => {
        setQuotes(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => console.error("목록 조회 실패:", err));
  }, [page]);

  const totalPages = Math.ceil(total / pageSize); // 총 페이지 수

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/quotes/${id}`);
        alert("삭제되었습니다.");
        // 목록 다시 불러오기
        setQuotes((prev) => prev.filter((quote) => quote.id !== id));
      } catch (err) {
        console.error(err);
        alert("삭제 중 오류 발생");
      }
    }
  };

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
                <button
                  onClick={() => navigate(`/admin/quotes/${quote.id}`)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  상세
                </button>
                <button
                  onClick={() => handleDelete(quote.id)}
                  className="text-red-500 hover:underline"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx)}
            className={`px-3 py-1 rounded ${
              page === idx ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
