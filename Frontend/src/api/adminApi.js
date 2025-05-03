import axios from "axios";

const BASE_URL = "http://localhost:8080/api/admin";

// 토큰 가져오는 헬퍼
function authHeaders() {
  const token = localStorage.getItem("adminToken");
  return { Authorization: `Bearer ${token}` };
}

// 1) 관리자 로그인
export const loginAdmin = async (username, password) => {
  const { data } = await axios.post(
    `${BASE_URL}/auth/login`,
    { username, password }
  );
  return data.token;
};

// 2) 관리자 견적 목록 조회
export const fetchAdminQuotes = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/quote-list`,
    { headers: authHeaders() }
  );
  return data;
};

// 3) FAQ 생성
export const createFaq = async (question, answer) => {
  const { data } = await axios.post(
    `${BASE_URL}/faqs`,
    { question, answer },
    { headers: authHeaders() }
  );
  return data;
};

// 4) FAQ 목록 조회
export const fetchFaqs = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/faqs`,
    { headers: authHeaders() }
  );
  return data; // [{ id, question, answer, createdAt }, …]
};

// 5) FAQ 상세 조회
export const fetchFaqDetail = async (id) => {
  const { data } = await axios.get(
    `${BASE_URL}/faqs/${id}`,
    { headers: authHeaders() }
  );
  return data; // { id, question, answer, createdAt }
};

// 6) FAQ 수정
export const updateFaq = async (id, question, answer) => {
  await axios.put(
    `${BASE_URL}/faqs/${id}`,
    { question, answer },
    { headers: authHeaders() }
  );
};

// 7) FAQ 삭제
export const deleteFaq = async (id) => {
  await axios.delete(
    `${BASE_URL}/faqs/${id}`,
    { headers: authHeaders() }
  );
};


// Admin: 전체 문의 목록 조회
export async function fetchAllInquiries() {
  const token = localStorage.getItem("adminToken");
  const res = await axios.get(
    `${BASE_URL}/inquiries`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // [{ id, businessId, businessName, subject, status, createdAt }]
}

// Admin: 문의 상세 및 답변 조회
export async function fetchInquiryAdminDetail(id) {
  const token = localStorage.getItem("adminToken");
  const res = await axios.get(
    `${BASE_URL}/inquiries/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // { id, businessId, businessName, subject, message, status, createdAt, reply, repliedAt }
}

// Admin: 답변 등록
export async function createInquiryReply(id, answer) {
  const token = localStorage.getItem("adminToken");
  const res = await axios.post(
    `${BASE_URL}/inquiries/${id}/reply`,
    { answer },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

