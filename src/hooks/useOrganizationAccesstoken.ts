// the req access token
const getAccessToken = () => {
  return localStorage.getItem("accessTokenO");
};

export const getOrganizationToken = () => {
  const token = getAccessToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};
