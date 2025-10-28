import axiosInstance from "./axiosInstance";

const API_URL = "/resources";

export const getResources = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

export const createResource = async (data) => {
  const response = await axiosInstance.post(API_URL, data);
  return response.data;
};

export const updateResource = async (id, data) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};
