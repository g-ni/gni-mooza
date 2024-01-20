import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUserByEmail = async (email) => {
  const res = await axios.get(
    `${apiUrl}/api/users/getUserByEmail?email=${email}`
  );

  return res.data;
};
