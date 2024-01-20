import { createSlice } from "@reduxjs/toolkit";

const initialChatsState = {
  chats: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const chatsSlice = createSlice({
  name: "chats",
  initialState: initialChatsState,
  reducers: {
    addChat(state, action) {
      state.chats.push(action.payload);
    },
    deleteLoading(state) {
      state.chats.pop();
    },
  },
});

export default chatsSlice.reducer;
export const chatsActions = chatsSlice.actions;
