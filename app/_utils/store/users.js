import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserByEmail } from "../requests/users";

const initialUsersState = {
  user: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getUser = createAsyncThunk(
  "users/getUserByEmail",
  async (email, thunkAPI) => {
    try {
      return await getUserByEmail(email);
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

const userSlice = createSlice({
  name: "users",
  initialState: initialUsersState,

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default userSlice.reducer;
