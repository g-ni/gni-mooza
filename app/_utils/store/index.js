import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import chatsReducer from "./chats";
import projectReducer from "./projects";
import userReducer from "./users";
import imagesReducer from "./images";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
    projects: projectReducer,
    users: userReducer,
    images: imagesReducer,
  },
});

export default store;
