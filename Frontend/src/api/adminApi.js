import axios from "axios";

const BASE_URL = "http://localhost:8080/api/admin";

export const loginAdmin = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data.token;
};

export const fetchAdminQuotes = async () => {
  const token = localStorage.getItem("adminToken");
  const response = await axios.get(`${BASE_URL}/quote-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

