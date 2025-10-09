export const fetchTours = async () => {
    const res = await fetch("http://localhost:7070/api/tours");
    const data = await res.json();
    return data.tours;
  };
  