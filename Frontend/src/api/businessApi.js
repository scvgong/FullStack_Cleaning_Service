import axios from "axios";

const BUSINESS_BASE_URL = "http://localhost:8080/api/business";

export async function loginBusiness(username, password) {
  const res = await axios.post(
    `${BUSINESS_BASE_URL}/auth/login`,
    {
      username,
      password,
    }
  );
  return res.data.token;
}

export async function getBusinessQuotes(token) {
  const res = await axios.get(`${BUSINESS_BASE_URL}/quotes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function getBusinessQuoteById(token, id) {
  const res = await axios.get(
    `${BUSINESS_BASE_URL}/quotes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

// Business: 문의 생성
export async function createInquiry(subject, message) {
  const token = localStorage.getItem("businessToken");
  const res = await axios.post(
    `${BUSINESS_BASE_URL}/inquiries`,
    { subject, message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

// Business: 내 문의 목록 조회
export async function fetchMyInquiries() {
  const token = localStorage.getItem("businessToken");
  const res = await axios.get(
    `${BUSINESS_BASE_URL}/inquiries`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // [{ id, subject, status, createdAt }]
}

// Business: 내 문의 상세 조회
export async function fetchInquiryDetail(id) {
  const token = localStorage.getItem("businessToken");
  const res = await axios.get(
    `${BUSINESS_BASE_URL}/inquiries/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // { id, subject, message, status, createdAt, reply, repliedAt }
}
