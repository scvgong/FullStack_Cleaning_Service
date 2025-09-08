// src/api/memberApi.js
import axios from "axios";

const MEMBER_BASE_URL = "http://localhost:8080/api/members";

// 회원가입
export async function registerMember({ username, password, name, phone }) {
  const res = await axios.post(`${MEMBER_BASE_URL}/register`, {
    username, password, name, phone,
  });
  return res.data;
}

// 로그인 (token 반환)
export async function loginMember(username, password) {
  const res = await axios.post(`${MEMBER_BASE_URL}/auth/login`, { username, password });
  return res.data.token; // { token }
}

// 내 정보
export async function fetchMemberProfile() {
  const token = localStorage.getItem("memberToken");
  const res = await axios.get(`${MEMBER_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// 로그아웃
export function logoutMember() {
  localStorage.removeItem("memberToken");
}
