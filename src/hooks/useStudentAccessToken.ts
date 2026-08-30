// the req access token
const getAccessToken = () => {
  return localStorage.getItem("accessTokenS");
};

export const getStudentToken = () => {
  const token = getAccessToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};
