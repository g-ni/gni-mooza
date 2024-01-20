import axios from "axios";

const chatUrl = process.env.NEXT_PUBLIC_CHAT_API;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAnswer = async (item) => {
  const res = await axios.post(`${chatUrl}`, item);

  return res.data;
};

export const addNewChat = async (chat) => {
  const res = await axios.post(`${apiUrl}/api/chats/newChat`, chat);

  return res.data;
};

export const updateChat = async (chat) => {
  const res = await axios.post(`${apiUrl}/api/chats/updateChat`, chat);

  return res.data;
};
