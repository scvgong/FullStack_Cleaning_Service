import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginMember, fetchMemberProfile } from "../../api/memberApi";

const MemberLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const next = new URLSearchParams(location.search).get("next") || "/";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();
        setErr("");
        try{
            const token = await loginMember(username, password);
            localStorage.setItem("memberToken", token);
            navigate(next);
        } catch(e) {
            console.error(e);
            setErr("아이디 또는 비밀번호를 확인해주세요");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-4">회원 로그인</h2>
            <form onSubmit={onSubmit} className="space-y-3">
                <input className="w-full border px-3 py-2 rounded" placeholder="아이디" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input className="w-full border px-3 py-2 rounded" type="password" placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {err && <p className="text-red-600 text-sm">{err}</p>}
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">로그인</button>
                <Link to="/member/register" className="block text-center text-sm text-gray-600 hover:underline">
                아직 회원이 아니신가요? 회원가입
                </Link>
            </form>
        </div>
    );
}

export default MemberLogin;