import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../Context/AuthContext";
import UsersTable from "../../Components/UsersTable";

const AdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch users:", err.response?.data?.message);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete user:", err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👥 All Users</h2>
      <UsersTable users={users} onDelete={deleteUser} />
    </div>
  );
};

export default AdminUsers;
