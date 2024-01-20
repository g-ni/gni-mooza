import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//start a new project
export const postProject = async (project) => {
  const res = await axios.post(`${apiUrl}/api/projects/newProject`, project);

  return res.data;
};

export const getProjectById = async (projectDetails) => {
  const res = await axios.get(
    `${apiUrl}/api/projects/getProjectById?projectId=${projectDetails.projectId}&userId=${projectDetails.userId}`
  );

  return res.data;
};

export const updateProject = async (project) => {
  const res = await axios.put(`${apiUrl}/api/projects/updateProject`, project);

  return res.data;
};

export const updateProjectChat = async (project) => {
  const res = await axios.put(
    `${apiUrl}/api/projects/updateProjectChat`,
    project
  );

  return res.data;
};

export const getProjectsByUser = async (userId) => {
  const res = await axios.get(
    `${apiUrl}/api/projects/getProjectsByUser?userId=${userId}`
  );

  return res.data;
};
