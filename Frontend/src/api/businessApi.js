import axios from "axios";

const BUSINESS_BASE_URL = "http://localhost:8080/api/business";

// 사업자 회원가입 API
export async function registerBusinessUser(form, certFile) {
  const formData = new FormData();
  const json = JSON.stringify(form);
  formData.append("data", new Blob([json], { type: "application/json" }));
  if (certFile) {
    formData.append("certFile", certFile);
  }

  const res = await axios.post(
    "http://localhost:8080/api/business/register",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return res.data;
}

// 사업자 로그인
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

// 내 정보 조회
export async function fetchBusinessUserInfo() {
  const token = localStorage.getItem("businessToken");
  const res = await axios.get(`${BUSINESS_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// 내 정보 수정
export async function updateBusinessUserInfo(updateForm, bizDocFile) {
  const token = localStorage.getItem("businessToken");
  const formData = new FormData();
  const json = JSON.stringify(updateForm);

  formData.append("data", new Blob([json], { type: "application/json" }));
  if (bizDocFile) {
    formData.append("bizDoc", bizDocFile);
  }

  await axios.put(`${BUSINESS_BASE_URL}/me`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

// 견적 리스트 조회 (전체 및 검색)
export async function getBusinessQuotes(token, { keyword = "", serviceType = "", spaceType = "", page = 1 , size=10 }) {
  const res = await axios.get(`${BUSINESS_BASE_URL}/quotes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      keyword,
      page,
      size,
      serviceType,
      spaceType
    }
  });
  return res.data;
}

// 견적 상세조회
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
