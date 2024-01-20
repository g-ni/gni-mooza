import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  postProject,
  updateProject,
  getProjectById,
  getProjectsByUser,
  updateProjectChat,
} from "../requests/projects";

const initialProjectsState = {
  projects: [],
  chats: [],
  project: {},
  projectId: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const projectUpdate = createAsyncThunk(
  "projects/updateProject",
  async (project, thunkAPI) => {
    try {
      return await updateProject(project);
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

export const updateChatInProject = createAsyncThunk(
  "projects/updateProjectChat",
  async (project, thunkAPI) => {
    try {
      return await updateProjectChat(project);
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

export const newProject = createAsyncThunk(
  "projects/newProject",
  async (project, thunkAPI) => {
    try {
      return await postProject(project);
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

export const getProject = createAsyncThunk(
  "projects/getProjectById?projectId",
  async (projectDetails, thunkAPI) => {
    try {
      return await getProjectById(projectDetails);
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

export const getProjectsByUserId = createAsyncThunk(
  "projects/getProjectsByUser",
  async (userId, thunkAPI) => {
    try {
      return await getProjectsByUser(userId);
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

const projectSlice = createSlice({
  name: "projects",
  initialState: initialProjectsState,
  reducers: {
    setProjectId(state, action) {
      state.projectId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(newProject.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(newProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(newProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(projectUpdate.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(projectUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = action.payload;
      })
      .addCase(projectUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateChatInProject.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateChatInProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload.Chats;
      })
      .addCase(updateChatInProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProject.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProjectsByUserId.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getProjectsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjectsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default projectSlice.reducer;
export const selectAllProjects = (state) => state.projects.projects;
export const projectActions = projectSlice.actions;
