import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//register a new user
export const postRegister = async (user) => {
  const res = await axios.post(`${apiUrl}/api/auth/register`, user);
  if (res.status === 208) {
    return "user exists";
  } else {
    return res.data;
  }
};
