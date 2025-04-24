import { useEffect, useState } from "react";
import { fetchFaqs, deleteFaq } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

  const load = () => {
    fetchFaqs()
      .then(setFaqs)
      .catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteFaq(id);
      load();
    } catch (e) {
      console.error(e);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">FAQ 목록</h2>
        <button
          onClick={() => navigate("/admin/faqs/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          작성
        </button>
      </div>

      {faqs.length === 0 ? (
        <p>등록된 FAQ가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {faqs.map((f) => (
            <li key={f.id} className="border p-4 rounded hover:bg-gray-50">
              <p className="font-medium">{f.question}</p>
              <p className="text-gray-700 mt-1">{f.answer}</p>
              <p className="text-xs text-gray-500 mt-2">
                등록일: {new Date(f.createdAt).toLocaleString()}
              </p>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => navigate(`/admin/faqs/${f.id}`)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  상세
                </button>
                <button
                  onClick={() => navigate(`/admin/faqs/${f.id}/edit`)}
                  className="px-2 py-1 bg-yellow-200 rounded"
                >
                  수정
                </button>
                <button
                  onClick={() => onDelete(f.id)}
                  className="px-2 py-1 bg-red-300 text-white rounded"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FaqList;
