export const fetchTours = async () => {
    const res = await axiosInstance.get("/tours");
    const data = await res.json();
    return data.tours;
  };
  