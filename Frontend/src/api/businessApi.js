import axios from "axios";

export async function loginBusiness(username, password) {
  const res = await axios.post(
    "http://localhost:8080/api/business/auth/login",
    {
      username,
      password,
    }
  );
  return res.data.token;
}

export async function getBusinessQuotes(token) {
  const res = await axios.get("http://localhost:8080/api/business/quotes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function getBusinessQuoteById(token, id) {
  const res = await axios.get(
    `http://localhost:8080/api/business/quotes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
