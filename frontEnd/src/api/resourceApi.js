// src/api/resourceApi.js
import axios from "axios";

const API_URL = "http://localhost:7070/api/resources";

// Get all resources
export const getResources = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new resource
export const createResource = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Update resource by ID
export const updateResource = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Delete resource
export const deleteResource = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
