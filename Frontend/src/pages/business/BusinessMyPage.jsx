import { useEffect, useState } from "react";
import { fetchBusinessUserInfo, updateBusinessUserInfo } from "../../api/businessApi";
import { Link } from "react-router-dom";

const BusinessMyPage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [bizDocFile, setBizDocFile] = useState(null);

  useEffect(() => {
    fetchBusinessUserInfo().then((res) => {
      setUser(res);
      setForm(res); // 초기 form 값 설정
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBizDocFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    await updateBusinessUserInfo(form, bizDocFile);
    alert("수정 완료되었습니다.");
    setEditMode(false);
    window.location.reload();
  };

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">사업자 마이페이지</h2>

      {!editMode ? (
        <div>
          <p><strong>아이디:</strong> {user.username}</p>
          <p><strong>상호명:</strong> {user.name}</p>
          <p><strong>사업자번호:</strong> {user.businessNo}</p>
          <p><strong>연락처:</strong> {user.phone}</p>
          <p><strong>보조 연락처:</strong> {user.altPhone || "-"}</p>
          <p><strong>등록증:</strong>{user.bizDocPath ? (
            <a href={`/${user.bizDocPath}`} target="_blank" rel="noreferrer">파일 보기</a>
          ) : "없음"}</p>
          <p><strong>가입일:</strong> {user.createdAt.slice(0, 10)}</p>
          <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            수정하기
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="상호명" className="border p-2 w-full" />
          <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="연락처" className="border p-2 w-full" />
          <input type="text" name="altPhone" value={form.altPhone || ""} onChange={handleChange} placeholder="보조 연락처 (선택)" className="border p-2 w-full" />
          <input type="password" name="password" value={form.password || ""} onChange={handleChange} placeholder="비밀번호 변경 (선택)" className="border p-2 w-full" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 w-full" />
          <div className="flex gap-2 mt-4">
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">저장</button>
            <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded">취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessMyPage;
