import axiosInstance from "./axiosInstance";

export const getResourceDetails = async (resourceId) => {
  const res = await axiosInstance.get(`/resource-details/by-resource/${resourceId}`);
  return res.data;
};

export const getAllResourceDetails = async () => {
  const res = await axiosInstance.get("/resource-details");
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

export const deleteResourceDetailPhoto = async (id, photoUrl) => {
  return axiosInstance.delete(`/api/resource-details/${id}/photo`, { data: { photoUrl } });
};

export const updateResourceDetail = async (id, data) => {
  const res = await axiosInstance.put(`/resource-details/${id}`, data);
  return res.data;
};

export const deletePhotoFromResourceDetail = async (id, photoUrl) => {
  const res = await axiosInstance.delete(`/resource-details/${id}/photos`, {
    data: { photoUrl },
  });
  return res.data;
};


export const getResourceDetailById = async (id) => {
  const res = await axiosInstance.get(`/resource-details/${id}`);
  return res.data;
};

export const addCommentToResourceDetail = async (id, commentData) => {
  const res = await axiosInstance.post(`/resource-details/${id}/comments`, commentData);
  return res.data;
};
