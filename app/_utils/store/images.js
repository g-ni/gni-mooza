import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getImages } from "@/app/_utils/requests/images";

const initialImagesState = {
  images: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getImagesByDetails = createAsyncThunk(
  "images/getImages",
  async (imagesDetails, thunkAPI) => {
    try {
      return await getImages(imagesDetails);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState: initialImagesState,
  reducers: {
    setImages(state, action) {
      state.images = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImagesByDetails.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getImagesByDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(getImagesByDetails, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default imagesSlice.reducer;
export const imagesActions = imagesSlice.actions;
