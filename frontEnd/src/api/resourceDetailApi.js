import axiosInstance from "./axiosInstance";

export const getResourceDetails = async (resourceId) => {
  const res = await axiosInstance.get(`/resource-details?resourceId=${resourceId}`);
  return res.data;
};

export const createResourceDetail = async (data) => {
  const res = await axiosInstance.post("/resource-details", data);
  return res.data;
};

export const deleteResourceDetail = async (id) => {
  const res = await axiosInstance.delete(`/resource-details/${id}`);
  return res.data;
};
