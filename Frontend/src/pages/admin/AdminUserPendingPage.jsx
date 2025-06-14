import { useEffect, useState } from "react";
import axios from "axios";

const AdminUserPendingPage = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
      fetchPendingUsers();
    }, []);
  
    const fetchPendingUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/users/pending", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        console.log("Api 응답 : ", res.data);   
        const data = Array.isArray(res.data) ? res.data : [];
        setPendingUsers(data);
      } catch (err) {
        console.error("오류 : ", err.response);
        setError("조회 실패");
      } finally {
        setLoading(false);
      }
    };
  
    const approveUser = async (id) => {
      const role = prompt("부여할 권한을 입력하세요 (예: ROLE_FAQ_MANAGER):");
      if (!role) return;
  
      try {
        await axios.put(`http://localhost:8080/api/admin/users/${id}/approve`, { role }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          },
        });
        alert("승인 완료");
        fetchPendingUsers(); // 승인 후 목록 새로고침
      } catch (err) {
        alert("승인 실패");
      }
    };
  
    if (loading) return <p>로딩 중...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">승인 대기 중인 관리자 목록</h2>
        {pendingUsers.length === 0 ? (
          <p>승인 대기 관리자가 없습니다.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">이름</th>
                <th className="border p-2">아이디</th>
                <th className="border p-2">등록일</th>
                <th className="border p-2">승인</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => approveUser(user.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      승인
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
}

export default AdminUserPendingPage;