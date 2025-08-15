// src/pages/Admin/TotalUsers.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/TotalUsers.css";
import { toast } from "react-toastify";


function TotalUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handlePromote = async (email) => {
    try {
      const res = await axiosInstance.put("/admin/promote", { email }); // match backend POST
  
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.email === email ? res.data.updatedUser : u
        )
      );
  
      toast.success(`✅ ${email} is now an Admin`);
    } catch (err) {
      console.error("Promote failed:", err);
      toast.error("❌ Failed to promote user");
    }
  };
  
  toast.success("User promoted to admin!");  

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="total-users-page">
      <h1>Total Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                <span className={`role-badge ${user.isAdmin ? "admin" : "user"}`}>
                    {user.isAdmin ? "admin" : "user"}
                </span>
                </td>

                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  {!user.isAdmin && (
                    <button
                      className="btn-promote"
                      onClick={() => handlePromote(user.email)}
                    >
                      Promote
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="bottom-line"></div>
    </div>
  );
}

export default TotalUsers;
