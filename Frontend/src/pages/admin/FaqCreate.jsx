import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFaq } from "../../api/adminApi";

const FaqCreate = () => {
    const [question , setQuestion] = useState("");
    const [answer , setAnswer] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const token = localStorage.getItem("adminToken");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if(!question.trim() || !answer.trim()){
            setError("질문과 답변을 모두 입력해야 합니다.");
            return;
        }

        try {
            await createFaq(question, answer);
            navigate("/admin/faqs");
        } catch (err){
            console.error(err.response?.status, err.response?.data);
            setError("FAQ 생성에 실패했습니다: " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
        <h2 className="text-2xl font-bold mb-6">새 FAQ 작성</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">질문</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="예) 서비스 요금은 어떻게 되나요?"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">답변</label>
            <textarea
              className="w-full p-2 border rounded h-32"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="예) 기본 요금은 50,000원부터 시작합니다..."
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            작성하기
          </button>
        </form>
      </div> 
    );
}

export default FaqCreate;