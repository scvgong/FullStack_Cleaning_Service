// src/pages/admin/FaqDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchFaqDetail, deleteFaq } from "../../api/adminApi";

const FaqDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFaqDetail(id, token)
      .then((dto) => {
        setFaq(dto);
        setLoading(false);
      })
      .catch((err) => {
        setError("불러오는 도중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, [id, token]);

  const handleDelete = async () => {
    if (!window.confirm("정말 이 FAQ를 삭제하시겠습니까?")) return;
    try {
      await deleteFaq(id);
      navigate("/admin/faqs");
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading) return <p className="p-6">로딩 중…</p>;
  if (error)   return <p className="p-6 text-red-500">{error}</p>;
  if (!faq)   return <p className="p-6">존재하지 않는 FAQ 입니다.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">FAQ 상세보기</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">질문</h3>
        <p className="whitespace-pre-wrap">{faq.question}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">답변</h3>
        <p className="whitespace-pre-wrap">{faq.answer}</p>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        작성일: {new Date(faq.createdAt).toLocaleString()}
      </p>

      <div className="flex space-x-2">
        <Link
          to={`/admin/faqs/${id}/edit`}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          수정하기
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          삭제하기
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default FaqDetail;
