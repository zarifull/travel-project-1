import React from "react";
import "../styles/UserTable.css";

function UserTable({ users, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr key={user._id}>
            <td>{idx + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => onDelete(user._id)} className="btn-del">Delete</button>
              <button className="btn-edit">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
