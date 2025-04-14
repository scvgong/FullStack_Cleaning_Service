export const isAdminAuthenticated = () => {
  const token = localStorage.getItem("adminToken");
  return !!token;
};
