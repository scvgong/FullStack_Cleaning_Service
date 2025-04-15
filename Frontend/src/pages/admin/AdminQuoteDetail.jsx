import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AdminQuoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/quotes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        setQuote(res.data);
        setForm({
          adminReply: res.data.adminReply || "",
          status: res.data.status || "",
        });
        // 초기 폼 데이터 설정
      })
      .catch((err) => console.error("상세 정보 불러오기 실패:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 삭제 이벤트
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/quotes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        alert("삭제되었습니다.");
        navigate("/admin/quotes");
      } catch (error) {
        alert("삭제 중 오류 발생");
        console.error("삭제 실패:", error);
      }
    }
  };

  // 수정 이벤트
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/admin/quotes/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      alert("수정되었습니다.");
      setEditMode(false);
      setQuote((prev) => ({ ...prev, ...form })); // 로컬 상태 업데이트
    } catch (err) {
      alert("수정 중 오류 발생");
      console.error("업데이트 실패:", err);
    }
  };

  if (!quote) return <div>로딩 중...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">견적 상세 정보</h2>

      <div className="space-y-2 mb-4">
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
      </div>

      {editMode ? (
        <div className="space-y-4 border-t pt-4 mt-4">
          <div>
            <label className="block font-medium mb-1">처리 상태</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">선택하세요</option>
              <option value="처리중">처리중</option>
              <option value="처리완료">처리완료</option>
              <option value="보류">보류</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">관리자 답변</label>
            <textarea
              name="adminReply"
              value={form.adminReply}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded px-3 py-2"
              placeholder="답변을 입력하세요..."
            />
          </div>
        </div>
      ) : (
        <div className="border-t pt-4 mt-4 space-y-2">
          <p>
            <strong>처리 상태:</strong> {quote.status || "미지정"}
          </p>
          <p>
            <strong>관리자 답변:</strong> {quote.adminReply || "없음"}
          </p>
        </div>
      )}

      <h3>첨부 이미지</h3>
      {quote.images && quote.images.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {quote.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:8080/uploads/${img.filePath}`}
              alt={`견적 이미지 ${index + 1}`}
              style={{
                width: "200px",
                height: "auto",
                marginRight: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </div>
      )}

      <div className="mt-6 space-x-2">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={() => navigate("/admin/quotes")}
        >
          목록
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={handleDelete}
        >
          삭제
        </button>
        {editMode ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleUpdate}
          >
            저장
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={() => setEditMode(true)}
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
}
