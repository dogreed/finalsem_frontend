// the req access token
const getAccessToken = () => {
  return localStorage.getItem("accessTokenA");
};

export const getAdminToken = () => {
  const token = getAccessToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};
