import { useEffect, useState } from "react";
import { getBusinessQuotes } from "../../api/businessApi";
import { Link } from "react-router-dom";
import Pagination from "../../components/common/Pagination";

const BusinessQuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [spaceType, setSpaceType] = useState("");
  const [size] = useState(10); // 페이지당 항목 수
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("businessToken");

  const fetchQuotes = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getBusinessQuotes(token, {keyword, page, serviceType, spaceType, size}); // ✅ keyword 전달
      setQuotes(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("견적 목록 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(); // 최초 로딩
  }, [token, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // 검색 시 페이지 초기화
    fetchQuotes(); // 검색 시 재요청
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">견적 요청 목록</h2>

      {/* 🔍 검색 + 필터 */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="이름, 전화번호, 이메일 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">전체 서비스</option>
          <option value="입주청소">입주청소</option>
          <option value="인테리어청소">인테리어청소</option>
          <option value="사무실청소">사무실청소</option>
        </select>
        <select
          value={spaceType}
          onChange={(e) => setSpaceType(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">전체 공간</option>
          <option value="아파트">아파트</option>
          <option value="주택">주택</option>
          <option value="상가">상가</option>
          <option value="사무실">사무실</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          검색
        </button>
      </form>

      {loading ? (
        <p>로딩 중...</p>
      ) : quotes.length === 0 ? (
        <p>조회된 요청이 없습니다.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {quotes.map((q) => (
              <li key={q.id} className="border p-4 rounded">
                <p><strong>서비스:</strong> {q.serviceType}</p>
                <p><strong>면적:</strong> {q.area} m²</p>
                <p><strong>고객명:</strong> {q.name}</p>
                <p><strong>연락처:</strong> {q.phone}</p>
                <div className="mt-2">
                  <strong>이미지:</strong>
                  <div className="flex space-x-2 mt-1">
                    {q.images.map((url, i) => (
                      <img key={i} src={url} alt="" className="w-24 h-24 object-cover" />
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/business/quotes/${q.id}`}
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    상세보기
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default BusinessQuoteList;