import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, rolesRes] = await Promise.all([
          axios.get('http://localhost:3000/users'),
          axios.get('http://localhost:3000/roles')
        ]);
        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id.toString() === roleId.toString());
    return role ? role.name : '';
  };

  const buyers = users.filter(user => getRoleName(user.role_id) === 'Buyer');
  const agents = users.filter(user => getRoleName(user.role_id) === 'Agent');

  const getAvatarUrl = (name) =>
    `https://api.dicebear.com/8.x/thumbs/svg?seed=${name}&radius=50&backgroundColor=yellow,blue,red,green,orange,purple`;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home");
  };
  const handleDelete = async (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };
  return (
    <>

      <div className="user-management-container">
        <h2 className="user-title">User Management Panel</h2>


        <div className="user-section">
          <h3 className="user-subtitle buyers">👥 Buyers</h3>
          <div className="user-grid">
            {buyers.map(user => (
              <div className="user-card buyer-card" key={user.id}>
                <div className="user-avatar">
                  {user.first_name.charAt(0)}
                  {user.last_name?.charAt(0)}
                </div>
                <div className="user-info">
                  <h4>{user.first_name} {user.last_name}</h4>
                  <p>{user.email}</p>
                  <p>{user.contact}</p>
                  <button
                    className="btn btn-sm mt-2"
                    style={{ backgroundColor: "#53d0d4ff", color: "#fff", border: "none" }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="user-section">
          <h3 className="user-subtitle sellers">🏢 Sellers (Agents)</h3>
          <div className="user-grid">
            {agents.map(user => (
              <div className="user-card seller-card" key={user.id}>
                <div className="user-avatar">
                  {user.first_name.charAt(0)}
                  {user.last_name?.charAt(0)}
                </div>
                <div className="user-info">
                  <h4>{user.first_name} {user.last_name}</h4>
                  <p>{user.email}</p>
                  <p>{user.contact}</p>
                  <button
                    className="btn btn-sm mt-2"
                    style={{ backgroundColor: "#b66e42ff", color: "#fff", border: "none" }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
