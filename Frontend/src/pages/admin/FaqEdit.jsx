// src/pages/admin/FaqEdit.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFaqDetail, updateFaq } from "../../api/adminApi";

const FaqEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer]     = useState("");
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    // 기존 FAQ 불러와서 state 에 미리 채워두기
    fetchFaqDetail(id, token)
      .then((dto) => {
        setQuestion(dto.question);
        setAnswer(dto.answer);
        setLoading(false);
      })
      .catch(() => {
        setError("불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      setError("질문과 답변을 모두 입력해주세요.");
      return;
    }
    try {
      await updateFaq(id, question, answer);
      navigate(`/admin/faqs/${id}`);
    } catch {
      setError("수정에 실패했습니다.");
    }
  };

  if (loading) return <p className="p-6">로딩 중…</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">FAQ 수정</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">질문</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">답변</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 border rounded h-32"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            저장
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default FaqEdit;
