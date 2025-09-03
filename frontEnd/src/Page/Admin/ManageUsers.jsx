// src/pages/Admin/TotalUsers.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/ManageUsers.css";
import { toast } from "react-toastify";


function TotalUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});

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
      const token = localStorage.getItem("token"); // where you saved JWT on login
  
      const res = await axiosInstance.put(
        "/admin/promote",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
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
  


  const handleDemote = async (email) => {
    if (!window.confirm(`Are you sure you want to demote ${email}?`)) return;
  
    setProcessing((prev) => ({ ...prev, [email]: true }));
  
    try {
      const res = await axiosInstance.put("/admin/demote", { email });
  
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.email === email ? res.data.updatedUser : u))
      );
  
      toast.success(`✅ ${email} has been demoted to user`);
    } catch (err) {
      console.error("Demote failed:", err);
      toast.error("❌ Failed to demote user");
    } finally {
      setProcessing((prev) => ({ ...prev, [email]: false }));
    }
  };
  
  

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-dashboard">
      <p className="manage-theme">Manage  Users</p>
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
                <span className={`role-badge ${user.role === "admin" ? "admin" : "user"}`}>
                  {user.role}
                </span>
                </td>

                {/* <td>{new Date(user.createdAt).toLocaleDateString()}</td> */}
                <td>{user.phone}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>

                  {user.role === "admin" ? (
                      <button
                        className="btn-demote"
                        onClick={() => handleDemote(user.email)}
                        disabled={processing[user.email]}
                      >
                        Demote
                      </button>
                    ) : (
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
