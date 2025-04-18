import axios from "axios";

export async function loginBusiness(username, password) {
  const res = await axios.post("http://localhost:8080/api/business/auth/login", {
    username,
    password,
  });
  return res.data.token;
}
