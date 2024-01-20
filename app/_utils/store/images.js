import { createSlice } from "@reduxjs/toolkit";

const initialImagesState = {
  images: [],
};

const imagesSlice = createSlice({
  name: "images",
  initialState: initialImagesState,
  reducers: {
    setImages(state, action) {
      state.images = action.payload;
    },
  },
});

export default imagesSlice.reducer;
export const imagesActions = imagesSlice.actions;
