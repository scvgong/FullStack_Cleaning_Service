import { useEffect, useState } from "react";
import axios from "axios";

const roleOptions = [
  { value: "ROLE_FAQ_MANAGER", label: "FAQ 담당" },
  { value: "ROLE_BIZ_MANAGER", label: "사업자 담당" },
  { value: "ROLE_ADMIN", label: "전체 관리자" },
  { value: "ROLE_SUPER_ADMIN", label: "슈퍼 관리자" },
];

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/users", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      setError("불러오기 실패");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/users/${id}/role`, { role: newRole }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      alert("역할이 변경되었습니다.");
      fetchUsers(); // 변경 후 새로고침
    } catch (err) {
      console.error("역할 변경 실패:", err);
      alert("역할 변경 실패");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">전체 관리자 목록</h2>

      {error && <p className="text-red-600">{error}</p>}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">이름</th>
            <th className="border p-2">아이디</th>
            <th className="border p-2">상태</th>
            <th className="border p-2">현재 역할</th>
            <th className="border p-2">역할 변경</th>
          </tr>
        </thead>
        <tbody>
        {users.filter((user) => user.status === "APPROVED").map((user) => ( // 승인된 가입자만 필터
            <tr key={user.id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.status}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border p-1 rounded"
                >
                    {roleOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                    ))}
                </select>
                </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserListPage;

