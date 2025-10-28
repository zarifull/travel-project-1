import axiosInstance from "./axiosInstance.js";

export const getAllCustomers = async () => {
  const res = await axiosInstance.get("/customers");
  return res.data;
};

export const getCustomerById = async (id) => {
  const res = await axiosInstance.get(`/customers/${id}`);
  return res.data;
};

export const getCustomersByResource = async (resourceDetailId) => {
  const res = await axiosInstance.get(`/customers/resource/${resourceDetailId}`);
  return res.data;
};
export const getAllCustomerDetails = async (resourceDetailId) => {
  const { data } = await axiosInstance.get(`/customers/all/${resourceDetailId}`);
  return data;
};
export const createCustomer = async (formData) => {
  const res = await axiosInstance.post("/customers", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateCustomer = async (id, formData) => {
  const res = await axiosInstance.put(`/customers/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteCustomer = async (id) => {
  const res = await axiosInstance.delete(`/customers/${id}`);
  return res.data;
};

export const addCommentToCustomer = async (id, commentData) => {
  const res = await axiosInstance.post(`/customers/${id}/comments`, commentData);
  return res.data;
};

export const getCommentsForCustomer = async (id) => {
  const res = await axiosInstance.get(`/customers/${id}/comments`);
  return res.data;
};

export const replyToComment = async (customerId, commentId, replyData) => {
  const res = await axiosInstance.post(
    `/customers/${customerId}/comments/${commentId}/reply`,
    replyData
  );
  return res.data;
};


export const deleteCommentFromCustomer = async (customerId, commentId) => {
  const res = await axiosInstance.delete(`/customers/${customerId}/comments/${commentId}`);
  return res.data;
};

export const deleteReplyFromComment = async (customerId, commentId, replyId) => {
  const res = await axiosInstance.delete(`/customers/${customerId}/comments/${commentId}/replies/${replyId}`);
  return res.data;
};
